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

// plog_clear();
plog("====================================");
plog("-> get_max_id.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

plog('POST: ', $_POST);
// получаем название таблицы
$tableName = json_decode($_POST["tableName"]);
plog('tableName: ', $tableName);

// делаем запрос SELECT в таблицу tableName
$data = selectData(
    $tableName,     // string, название таблицы
    ['id'],         // array, запрашиваемые поля
    'id',           // string, поле по которому сортируем
    'DESC',         // направление сортировки
    [],             // array, название полей покоторым делаем поиск
    1               // максиммальное количество записей в результате, 0 - не ограничено
);

plog('data: ', $data);

if (empty($data)) {
    $data = 0;
} else {
    if (gettype($data) == 'object') {
        $data = (array) $data;
    }
    $data = array_values($data)[0]['id'];
}

plog('getMaxId result: ', $data);
$response = new Response(
    data: (object) $data,
    dataCount: 1,
    errCount: $errCount,
    errDump: $errDump
);
echo $response->toJson();                                                // передаем данные
plog("get_max_id.php ->");