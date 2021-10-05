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



plog_clear();
plog("-> getData.php");

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
$searchField = json_decode($_POST["searchField"]);  // array, название полей покоторым делаем поиск
$searchValue = json_decode($_POST["searchValue"]);  // string, строка которую ищем в полях $searchField
$limit = $_POST["limit"];                           // максиммальное количество записей в результате, 0 - не ограничено

plog('tableName:');
plog($tableName);
plog('field keys:');
plog($keys);
plog('order by:');
plog($orderBy);

// перебираем запрошенные поля
// и ищем те, что из другой таблицы
// если есть, то складываем в массив $joinField[]
// $joinField = [];
// foreach($keys as $index => $key) {
//     $field = explode('/', $key);
//     plog('field:');
//     plog($field);
//     if (count($field) > 1) {
//         if (empty($joinField[$field[0]])) {
//             $joinField[$field[0]] = [];
//         }
//         array_push($joinField[$field[0]], $field[1]);
//     }
// }
// plog('joinField:');
// plog($joinField);

if (empty($joinField)) {

    // делаем запрос SELECT в таблицу tableName
    $data = selectData(
        $tableName,         // string, название таблицы
        $keys,              // array, запрашиваемые поля
        $orderBy,           // string, поле по которому сортируем
        $order,             // направление сортировки
        $searchField,       // array, название полей покоторым делаем поиск
        $searchValue,       // string, строка которую ищем в полях $searchField
        $limit              // максиммальное количество записей в результате, 0 - не ограничено
    );
} else {
    
    // делаем запрос SELECT JOIN в таблицу tableName
    $data = selectJoinData(
        $tableName,         // string, название таблицы
        $keys,              // array, запрашиваемые поля
        // $joinField,         // [joinTableName][joinField], названия полей в таблице присоединяемых данных
        $orderBy,           // string, поле по которому сортируем
        $order,             // направление сортировки
        $searchField,       // array, название полей покоторым делаем поиск
        $searchValue,       // string, строка которую ищем в полях $searchField
        $limit              // максиммальное количество записей в результате, 0 - не ограничено
    );
}

if (gettype($data) == 'object') {
    $data = (array) $data;
}
plog("data selected from $tableName:");
plog('type of data: ' . gettype($data));
plog('data length: ' . count($data));
// plog($data);



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


plog("getData.php ->");