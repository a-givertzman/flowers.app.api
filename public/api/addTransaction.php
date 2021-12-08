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
// require_once './libPHP/cors.php';

// cors();

// plog_clear();
plog("====================================");
plog("-> addTransaction.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

// plog('php://input:');
// plog(file_get_contents( 'php://input' ));

// plog('_REQUEST:');
// plog($_REQUEST);

plog('_POST: ', $_POST);
$data = json_decode($_POST['data']);
if (gettype($data) == 'object') {
    $data = (array) $data;
}
plog($data);
// получаем переданные параметры
$account_owner = $data['account_owner'];      // Идентификатор счета организатора
$value = $data['value'];                // Сумма транзакции
$purchase_member_id = isset($data['purchase_member/id']) 
    ? $data['purchase_member/id']
    : null;  // Идентификатор записи таблицы Участники закупки
$description = $data['description'];                           // Комментарий к транзакции
$client_id = $data['client/id'];  // array, название полей покоторым делаем поиск

plog('Recived and extracted parameters:');
plog("account_owner: ", $account_owner);
plog("value: ", $value);
plog("purchase_member_id: ", $purchase_member_id);
plog("description: ", $description);
plog("client_id: ", $client_id);

// Делаем вызов хранимой процедуры
$result = callProcedure('addTransaction', [
    $account_owner,         // Идентификатор счета организатора
    $value,                 // Сумма транзакции
    $purchase_member_id,    // Идентификатор записи таблицы Участники закупки
    $description,           // Комментарий к транзакции
    $client_id,             // array, название полей покоторым делаем поиск
]);

if ($result != 0) {
    $errCount++;
    $errDump .= preg_replace("/[\r\n\']/m", "", $result) . " | ";
    $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
    plog("Server reply error: $errDump \nIn query: $query");
}

plog('addTransaction result:', $result);
$response = new Response(
    data: (object) $result,
    dataCount: count($result),
    errCount: $errCount,
    errDump: $errDump
);
echo $response->toJson();                                                // передаем данные
plog("addTransaction.php ->");