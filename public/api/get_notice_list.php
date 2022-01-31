<?php
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2021 Anton Lobanov

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

declare(strict_types = 1);
include_once './api/Response.php';
include_once './api/PostParams.php';
include_once './api/MySqlConnect.php';
include_once './api/MySqlRequest.php';
include_once './api/SqlQuery.php';
include_once './api/WhereQueue';
// include_once './api/api.php';

// -------------------------------------------------------
// Логгер | Подключаем и настраиваем логгироавние
require_once './libPHP/plog.php';
require_once './libPHP/cors.php';
// загружаем настройки
require_once './libPHP/mysql_settings.key';

// plog_clear();
plog("====================================");
plog("-> get_notice_list.php");

// cors();

// может быть задан хотя бы один идентификатор
//  id - идентификатор записи одного оповещения
//  purchase_id - идентификатор закупки для которой запрошены оповещения
//  purchase_content_id - идентификатор позиции закупки для которой запрошены оповещения
$input = (new PostParams([
    'client_id',
    'id',
    'purchase_id',
    'purchase_content_id',
]))->getAll()->getData();

// получаем переданные параметры в формате json
$client_id = $input['client_id'];
$id = $input['id'];
$purchase_id = $input['purchase_id'];
$purchase_content_id = $input['purchase_content_id'];

plog('Recived and extracted parameters:');
plog('   client_id: ', $client_id);
plog('   id: ', $id);
plog('   purchase_id: ', $purchase_id);
plog('   purchase_content_id: ', $purchase_content_id);

$whereQueue = new WhereQueue(first: 'WHERE', count: 4);
if (isset($client_id)) {
    $query = "
        SELECT
            `notice`.`id` as `id`,
            `purchase/id`,
            `purchase_content/id`,
            `notice`.`message` as `message`,
            `notice_to_purchase_content`.`created` as `created`,
            `notice_to_purchase_content`.`updated` as `updated`,
            `notice_to_purchase_content`.`deleted` as `deleted`
        FROM `notice`
        LEFT JOIN `notice_to_purchase_content`
            ON `notice_to_purchase_content`.`notice/id` = `notice`.`id`
            AND `purchase_content/id` IN (
                SELECT `purchase_content/id`
                FROM `order`
                WHERE `client/id` = $client_id
                AND `deleted` IS NULL
            )
        WHERE `notice`.`deleted` IS NULL
        AND `notice_to_purchase_content`.`deleted` IS NULL
    ";
} else {
    $query = "
        SELECT
            `notice`.`id` as `id`,
            `purchase/id`,
            `purchase_content/id`,
            `notice`.`message` as `message`,
            `notice_to_purchase_content`.`created` as `created`,
            `notice_to_purchase_content`.`updated` as `updated`,
            `notice_to_purchase_content`.`deleted` as `deleted`
        FROM `notice`
        LEFT JOIN `notice_to_purchase_content`
            ON `notice_to_purchase_content`.`notice/id` = `notice`.`id`
        WHERE `notice`.`deleted` IS NULL
        AND `notice_to_purchase_content`.`deleted` IS NULL
    ";
}

if (isset($id)) {
    $query .= "    AND `id` = '$id'";
}
if (isset($purchase_id)) {
    $query .= "    AND `purchase_id` = '$purchase_id'";
}
if (isset($purchase_content_id)) {
    $query .= "    AND `purchase_content_id` = '$purchase_content_id'";
}
$query .= "    ORDER BY `updated`;";

$mySqlRequest = new MySqlRequest(
        new SqlQueryWithParams(
            [],
            $query
        ),
        new MySqlConnect(
            $db_host,
            $db_name,
            $db_user,
            $db_pass
        ),

    );
$response = $mySqlRequest->fetch();
echo $response->toJson();                                                // передаем данные
plog("get_notice_list.php ->");
