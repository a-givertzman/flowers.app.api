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



plog("");
plog("-> getData.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

plog('POST:');
plog($_POST);
// получаем название таблицы
$tableName = $_POST["tableName"];           // название таблицы
$keys = json_decode($_POST["keys"]);        // массив названий полей таблицы
$orderBy = json_decode($_POST["orderBy"]);  // название поля сортировки
plog('tableName:');
plog($tableName);
plog('field keys:');
plog($keys);
plog('order by:');
plog($orderBy);

$data_id = 0;

// делаем запрос SELECT в таблицу place_pattern
$data = selectData($tableName,
    $keys, 
    $orderBy, [], '%'
);

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