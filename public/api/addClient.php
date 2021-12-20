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
// Добавлять в отчет все ошибки PHP
error_reporting(E_ALL); //E_ALL
include_once './api/Response.php';
include_once './api/PostParams.php';
include_once './api/MySqlConnect.php';
include_once './api/MySqlRequest.php';
include_once './api/SqlQuery.php';
// include_once './api/api.php';

// -------------------------------------------------------
// Логгер | Подключаем и настраиваем логгироавние
require_once './libPHP/plog.php';
require_once './libPHP/cors.php';
// загружаем настройки mysql
require_once './libPHP/mysql_settings.key';

// plog_clear();
plog("====================================");
plog("-> addClient.php");

// cors();

// извлекаем входные параметры из json
$input = (new PostParams([
    'tableName',
    'fieldData',
]))->getAll()->getData();;
$fieldData = $input['fieldData'];
plog('fieldData:', $fieldData);
$tableName = $input['tableName'];
$group = $fieldData['group'];
$location = $fieldData['location'];
$name = $fieldData['name'];
$phone = $fieldData['phone'];
$pass = $fieldData['pass'];

plog('Recived and extracted parameters:');
plog('   tableName: ', $tableName);
plog('   group: ', $group);
plog('   location: ', $location);
plog('   name: ', $name);
plog('   phone: ', $phone);
plog('   pass: ', $pass);

$query = "
    INSERT INTO `client`(
        `group`,
        `location`,
        `name`,
        `phone`,
        `pass`
    )
    VALUES (
        '$group',
        '$location',
        '$name',
        '$phone'
        '$pass'
    )
    ON DUPLICATE KEY UPDATE
        `group` = '$group',
        `location` = '$location',
        `name` = '$name',
        `phone` = '$phone';
        `pass` = '$pass';
";
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
plog('addClient result:', $response);
echo $response->toJson();                                      // передаем данные
plog("addClient.php ->");
