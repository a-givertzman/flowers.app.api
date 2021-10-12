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
plog("-> getMaxId.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

plog('POST:');
plog($_POST);
// получаем название таблицы
$tableName = $_POST["tableName"];           // название таблицы
plog('tableName:');
plog($tableName);

// делаем запрос SELECT в таблицу tableName
$data = selectData(
    $tableName,     // string, название таблицы
    ['id'],          // array, запрашиваемые поля
    'id',       // string, поле по которому сортируем
    'DESC',         // направление сортировки
    [],             // array, название полей покоторым делаем поиск
    '%',            // string, строка которую ищем в полях $searchField
    1               // максиммальное количество записей в результате, 0 - не ограничено
);

plog($data);

if (empty($data)) {
    $data = 0;
} else {
    if (gettype($data) == 'object') {
        $data = (array) $data;
    }
    $data = array_values($data)[0];
}


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


plog("getMaxId.php ->");