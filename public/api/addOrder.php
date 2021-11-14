<?php
 
// -------------------------------------------------------
// Логгер | Подключаем и настраиваем логгироавние
// 

// Инициализируем переменные для хранения ошибок
$errCount = 0;
$errDump = " | ";

// Добавлять в отчет все ошибки PHP
error_reporting(E_ALL);

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
    foreach($data as $dataItem) {
        plog($dataItem);
        if (isset($dataItem)) {
            if (is_object($dataItem)) {
                $dataSet = (array) $dataItem;
            }
            $purchaseId = $dataSet['purchase/id'];
            $clientId = $dataSet['client/id'];
            $productId = $dataSet['product/id'];
            // делаем запрос для проверки существует ли запись с указанными id
            $query = "SELECT * 
                    FROM `$tableName` 
                    WHERE `purchase/id` = $purchaseId 
                    and `client/id` = $clientId 
                    and `product/id` = $productId 
                    LIMIT 1;";
            // plog('updating');
            $current_id = insertOdkuData($tableName, $dataSet, $query);
            array_push($result, $current_id);
            // plog("updated, id=$current_id");
        }
    }
    $result = (object) $result;
}

plog('addOrder result:', $result);
if (gettype($result) == 'object') {
    $result = (array) $result;
}
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
echo json_encode($jsonTplog("addOrder.php ->");