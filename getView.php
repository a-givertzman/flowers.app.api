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
// require_once './libPHP/cors.php';

// cors();



plog_clear();
plog("-> getView.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

plog('_POST:');
plog($_POST);
// получаем переданные параметры в формате json
$params = ($_POST['params']);                       // параметры в формате json
$viewName = json_decode($_POST["viewName"]);        // название view
$keys = json_decode($_POST["keys"]);                // массив названий полей таблицы
$orderBy = json_decode($_POST["orderBy"]);          // название поля сортировки
$order = $_POST["order"];                           // направление сортировки
$searchField = json_decode($_POST["searchField"]);  // array, название полей покоторым делаем поиск
$searchValue = json_decode($_POST["searchValue"]);  // string, строка которую ищем в полях $searchField
$limit = $_POST["limit"];                           // максиммальное количество записей в результате, 0 - не ограничено

plog('Recived and extracted parameters:');
plog('Params: ', $params);
plog('viewName: ', $tableName);
plog('field keys: ', $keys);
plog('rder by: ', $orderBy);
plog('order: ', $order);
plog('searchField: ', $searchField);
plog('searchValue:', $searchValue);
plog('limit: ', $limit);

// Делаем вызов хранимой процедуры
$result = selectView(
    $viewName,          // string, название view
    $params,            // параметры в формате json
    $keys,              // array, запрашиваемые поля
    $orderBy,           // string, поле по которому сортируем
    $order,             // направление сортировки
    $searchField,       // array, название полей покоторым делаем поиск
    $searchValue,       // string, строка которую ищем в полях $searchField
    $limit              // максиммальное количество записей в результате, 0 - не ограничено
);

plog('selectView result:');
plog($result);

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

echo json_encode($jsonText);                                                // передаем данные


plog("getView.php ->");