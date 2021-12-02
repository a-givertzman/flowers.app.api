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

// -------------------------------------------------------
// Логгер | Подключаем и настраиваем логгироавние
// 

// Инициализируем переменные для хранения ошибок
$errCount = 0;
$errDump = " | ";

// Добавлять в отчет все ошибки PHP
error_reporting(0); //E_ALL

require_once './libPHP/plog.php';



// plog_clear();
plog("====================================");
plog("-> addOrder.php");

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
    $result = [];
    $index = 0;
    foreach($data as $dataItem) {
        plog($dataItem);
        if (isset($dataItem)) {
            if (is_object($dataItem)) {
                $dataSet = (array) $dataItem;
            }
            $purchaseId = $dataSet['purchase/id'];
            $clientId = $dataSet['client/id'];
            $productId = $dataSet['product/id'];
            // запрос для проверки существует ли запись с указанными id
            $query = "SELECT * 
                    FROM `$tableName` 
                    WHERE `purchase/id` = $purchaseId 
                    and `client/id` = $clientId 
                    and `product/id` = $productId 
                    LIMIT 1;";
            // plog('updating');
            $current_id = insertOdkuData($tableName, $dataSet, $query);
            $result[$index] = $current_id;
            $index++;
            // plog("updated, id=$current_id");
        }
    }
    $result = (object) $result;
}

plog('addOrder result:', $result);
// проверяем были ли ошибки и передаем данные вызвывающей форме
$jsonText = [];                                                             // массив для передачи данных фронтенду
if ($errCount == 0) {
    // если все прошло без критичных ошибок
    $jsonText = array(                                                      // формируем набор данных и информацию об ошибках
        'data' => $result,
        'errCount' => $errCount,
        'errDump' => $errDump
    );
} else {
    // если были критичные ошибки
    plog("Server reply error: $errDump");
    $jsonText = array(                                                      // формируем набор данных и информацию об ошибках
        'errCount' => $errCount,
        'errDump' => $errDump
    );
}
echo json_encode($jsonText); 
plog("addOrder.php ->");