<?php
 
// -------------------------------------------------------
// Логгер | Подключаем и настраиваем логгироавние
// 

// Инициализируем переменные для хранения ошибок
$errCount = 0;
$errDump = " | ";

// Добавлять в отчет все ошибки PHP
error_reporting(E_ALL & ~E_NOTICE);

require_once './libPHP/plog.php';

// plog_clear();
plog("====================================");
plog("-> getJoinData.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

plog('POST:');
plog($_POST);
// получаем название таблицы
$tableName = json_decode($_POST["tableName"]);      // название таблицы
$keys = json_decode($_POST["keys"]);                // массив названий полей таблицы
$orderBy = json_decode($_POST["orderBy"]);          // название поля сортировки
$order = $_POST["order"];                           // направление сортировки
$where = json_decode($_POST["where"]);              // array, название полей покоторым делаем поиск
$limit = $_POST["limit"];                           // максиммальное количество записей в результате, 0 - не ограничено

plog('tableName:', $tableName);
plog('field keys: ', $keys);
plog('rder by: ', $orderBy);
plog('order: ', $order);
plog('where: ', $where);
plog('limit: ', $limit);

// делаем запрос SELECT JOIN в таблицу tableName
$data = selectJoinData(
    $tableName,         // string, название таблицы
    $keys,              // array, запрашиваемые поля
    $orderBy,           // string, поле по которому сортируем
    $order,             // направление сортировки
    $where,             // array of {operator: 'where'/'or'/'and', field: 'fieldNmae', cond: '=', value: value}
    $limit              // максиммальное количество записей в результате, 0 - не ограничено
);

if (gettype($data) == 'object') {
    $data = (array) $data;
}
plog("data selected from $tableName:");
plog('type of data: ' . gettype($data));
plog('data length: ' . count($data));
plog('data: ', $data);


// проверяем были ли ошибки и передаем данные вызвывающей форме
$jsonText = [];                                                             // массив для передачи данных фронтенду
if ($errCount == 0) {
    // если все прошло без критичных ошибок
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

plog("getJoinData.php ->");