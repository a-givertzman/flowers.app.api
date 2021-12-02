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
// include_once './api/api.php';

// -------------------------------------------------------
// Логгер | Подключаем и настраиваем логгироавние
// 
// Добавлять в отчет все ошибки PHP

require_once './libPHP/plog.php';
require_once './libPHP/cors.php';
// загружаем настройки
require_once './libPHP/mysql_settings.key';

// plog_clear();
plog("====================================");
plog("-> getPurchaseProduct.php");

// cors();

$postParams = new PostParams([
    'client/id',
    'purchase/id'
]);
$inputParams = $postParams->getParams()->getData();
$clientId = 4;//$inputParams['client/id'];
$purchaseContentPurchaseId = 6;//$inputParams['purchase/id'];

// получаем переданные параметры в формате json

plog('Recived and extracted parameters:');
plog('   clientId: ', $clientId);
plog('   purchaseContentPurchaseId: ', $purchaseContentPurchaseId);

$query = "
    SELECT 
            `purchase_content`.`purchase/id` AS `purchase/id`,
            `purchase_content`.`id` AS `id`,
            `purchase_content`.`sale_price` AS `sale_price`,
            `purchase_content`.`sale_currency` AS `sale_currency`,
            `purchase_content`.`shipping` AS `shipping`,
            `purchase_content`.`count` AS `count`,
            `purchase_content`.`created` AS `created`,
            `purchase_content`.`updated` AS `updated`,
            `purchase_content`.`deleted` AS `deleted`,
            `product`.`id` AS `product/id`,
            `product`.`group` AS `product/group`,
            `product`.`name` AS `product/name`,
            `product`.`detales` AS `product/detales`,
            `product`.`description` AS `product/description`,
            `product`.`primary_price` AS `product/primary_price`,
            `product`.`primary_currency` AS `product/primary_currency`,
            `product`.`primary_order_quantity` AS `product/primary_order_quantity`,
            `product`.`order_quantity` AS `product/order_quantity`,
            `product`.`picture` AS `product/picture`,
            GETREMAINS(`purchase_content`.`purchase/id`,
                    `purchase_content`.`id`,
                    `purchase_content`.`count`) AS `remains`,
            `order`.`count` as 'odere_count'
        FROM
            `purchase_content`
            LEFT JOIN `product` ON `purchase_content`.`product/id` = `product`.`id`
            LEFT JOIN `order` ON `client/id` = @1 AND `purchase_content`.`product/id` = `order`.`product/id`
        WHERE `purchase_content`.`purchase/id` = @2
        ORDER BY `purchase_content`.`id`
";

$mySqlRequest = new MySqlRequest(
        new SqlQueryWithParams(
            [
                $clientId,
                $purchaseContentPurchaseId
            ],
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
plog("getPurchaseProduct.php ->");
