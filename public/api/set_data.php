<?php
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2019-2021 Anton Lobanov

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

// -------------------------------------------------------
// Логгер | Подключаем и настраиваем логгироавние
// 

// Инициализируем переменные для хранения ошибок
$errCount = 0;
$errDump = " | ";

// Добавлять в отчет все ошибки PHP
error_reporting(E_ALL);

require_once './libPHP/plog.php';

// plog_clear();
plog("====================================");
plog("-> set_data.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

plog('_POST', $_POST);

$tableName = json_decode($_POST["tableName"]);
$data = json_decode($_POST["data"]);
$keys = json_decode($_POST["keys"]);      // массив названий полей таблицы

plog('tableName: ', $tableName);
plog('field keys: ', $keys);
plog('type of data: ', gettype($data));
plog('data: ', $data);

if (!empty($data)) {
    $data_id = [];
    foreach($data as $dataItem) {
        plog($dataItem);
        if (isset($dataItem)) {
            if (is_object($dataItem)) {
                $dataSet = (array) $dataItem;
            }    
            // plog('updating');
            $current_id = insertOdkuData($tableName, $dataSet);
            // plog("updated, id=$current_id");
            array_push($data_id, $current_id);
        }
    }
}

plog('setData result:', $data_id);
$response = new Response(
    data: (object) $data_id,
    dataCount: count($data_id),
    errCount: $errCount,
    errDump: $errDump
);
echo $response->toJson();                                                // передаем данные
plog("set_data.php ->");