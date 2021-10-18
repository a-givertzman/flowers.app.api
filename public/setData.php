<?php
 
// -------------------------------------------------------
// Логгер | Подключаем и настраиваем логгироавние
// 

// Инициализируем переменные для хранения ошибок
$errCount = 0;
$errDump = " | ";

// Добавлять в отчет все ошибки PHP
// error_reporting(E_ALL & ~E_NOTICE);

require_once './libPHP/plog.php';



plog_clear();
plog("-> setData.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';


// plog('postData');
// plog($_POST);

$tableName = $_POST['tableName'];
$data = json_decode($_POST['data']);
$keys = json_decode($_POST["keys"]);      // массив названий полей таблицы

plog('tableName');
plog($tableName);
plog('field keys:');
plog($keys);
plog('type of data');
plog(gettype($data));
plog($data);

if (!empty($data)) {
    $data_id = [];
    foreach($data as $dataItem) {
        plog($dataItem);
        if (!empty($dataItem)) {
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

// проверяем были ли ошибки и передаем данные вызвавшей форме
if ($errCount == 0) {

    // plog("reporting:");
    // plog($data_id);

    // возвращаем id сохраненного элемента
    $jsonText = array(                                                      // формируем набор данных и информацию об ошибках
        'data' => $data_id, // массив id сохраненных записей
        'errCount' => $errCount,
        'errDump' => $errDump
    );

    echo json_encode($jsonText);
} else {

    plog("Server reply error: $errDump");

    // сообщаем информацию о технической проблеме
    $jsonText = array(
        'errCount' => $errCount,
        'errDump' => $errDump
    );

    echo json_encode($jsonText);
}


plog("setData.php ->");