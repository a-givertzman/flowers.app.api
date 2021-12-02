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

 error_log("-> getData.php");
// -------------------------------------------------------
// Логгер | Подключаем и настраиваем логгироавние
// 

// Инициализируем переменные для хранения ошибок
$errCount = 0;
$errDump = " | ";

// Добавлять в отчет все ошибки PHP
error_reporting(0);

require_once './libPHP/plog.php';
// require_once './libPHP/cors.php';

// cors();

// plog_clear();
plog("====================================");
plog("-> getData.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

// plog('php://input: ', file_get_contents( 'php://input' ));
// plog('_REQUEST: ', $_REQUEST);

$data = ($_POST);
plog('_POST: ', $data);
// получаем название таблицы
$tableName = json_decode($_POST["tableName"]);      // название таблицы
$keys = json_decode($_POST["keys"]);                // массив названий полей таблицы
$orderBy = json_decode($_POST["orderBy"]);          // название поля сортировки
$order = json_decode($_POST["order"]);              // направление сортировки
$where = json_decode($_POST["where"]);              // array, название полей покоторым делаем поиск
$limit = json_decode($_POST["limit"]);              // максиммальное количество записей в результате, 0 - не ограничено

plog('tableName:', $tableName);
plog('field keys: ', $keys);
plog('rder by: ', $orderBy);
plog('order: ', $order);
plog('where: ', $where);
plog('limit: ', $limit);

// делаем запрос SELECT JOIN в таблицу tableName
$data = selectData(
    $tableName,         // string, название таблицы
    $keys,              // array, запрашиваемые поля
    $orderBy,           // string, поле по которому сортируем
    $order,             // направление сортировки
    $where,             // array of {operator: 'where'/'or'/'and', field: 'fieldNmae', cond: '=', value: value}
    $limit              // максиммальное количество записей в результате, 0 - не ограничено
);

if (is_object($data)) {
    $data = (array) $data;
}
plog("data selected from $tableName:");
plog('type of data: ', gettype($data));
plog('data length: ', count($data));
// plog('data: ', $data);


// проверяем были ли ошибки и передаем данные вызвывающей форме
$jsonText = [];                                                             // массив для передачи данных фронтенду
if ($errCount == 0) {
    // если все прошло ok
    $jsonText = array(                                                      // формируем набор данных и информацию об ошибках
        'data' => $data,
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

echo json_encode($jsonText);                                                // передаем данные

plog("getData.php ->");