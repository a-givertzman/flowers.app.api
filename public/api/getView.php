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
// -------------------------------------------------------
// Логгер | Подключаем и настраиваем логгироавние
// 

// Инициализируем переменные для хранения ошибок
$errCount = 0;
$errDump = " | ";

// Добавлять в отчет все ошибки PHP
error_reporting(0);

require_once './libPHP/plog.php';
require_once './libPHP/cors.php';

cors();



// plog_clear();
plog("====================================");
plog("-> getView.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

plog('_POST:', $_POST);
// получаем переданные параметры в формате json
$params = $_POST['params'];                       // параметры в формате json
$viewName = json_decode($_POST["tableName"]);        // название view
$keys = json_decode($_POST["keys"]);                // массив названий полей таблицы
$groupBy = json_decode($_POST["groupBy"]);          // название поля группировки
$orderBy = json_decode($_POST["orderBy"]);          // название поля сортировки
$order = json_decode($_POST["order"]);                           // направление сортировки
$where = json_decode($_POST["where"]);              // array, название полей покоторым делаем поиск
$limit = json_decode($_POST["limit"]);                           // максиммальное количество записей в результате, 0 - не ограничено

plog('Recived and extracted parameters:');
plog('params: ', $params);
plog('viewName: ', $viewName);
plog('field keys: ', $keys);
plog('order by: ', $groupBy);
plog('order by: ', $orderBy);
plog('order: ', $order);
plog('where: ', $where);
plog('limit: ', $limit);

// Делаем вызов хранимой процедуры
$data = selectView(
    $viewName,          // string, название view
    $params,            // параметры в формате json
    $keys,              // array, запрашиваемые поля
    $groupBy,           // string, поле по которому группируем
    $orderBy,           // string, поле по которому сортируем
    $order,             // направление сортировки
    $where,             // array, название полей покоторым делаем поиск
    $limit              // максиммальное количество записей в результате, 0 - не ограничено
);

plog('selectView result:', $data);
$response = new Response(
    data: (object) $data,
    dataCount: count($data),
    errCount: $errCount,
    errDump: $errDump
);
echo $response->toJson();                                                // передаем данные
plog("getView.php ->");

// if (gettype($result) == 'object') {
//     $result = (array) $result;
// }
// // проверяем были ли ошибки и передаем данные вызвывающей форме
// $jsonText = [];                                                             // массив для передачи данных фронтенду
// if ($errCount == 0) {
//     // если все прошло без критичных ошибок
//     $jsonText = array(                                                      // формируем набор данных и информацию об ошибках
//         'data' => $result,
//         'errCount' => $errCount,
//         'errDump' => $errDump
//     );
// } else {
//     // если были критичные ошибки
//     plog("Server reply error: $errDump");
//     $jsonText = array(                                                      // формируем набор данных и информацию об ошибках
//         'errCount' => $errCount,
//         'errDump' => $errDump
//     );
// }
// echo json_encode($jsonText);                                                // передаем данные