<?php
 
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

// plog('_POST:', $_POST);
// получаем переданные параметры в формате json
$params = $_POST['params'];                       // параметры в формате json
$viewName = json_decode($_POST["tableName"]);        // название view
$keys = json_decode($_POST["keys"]);                // массив названий полей таблицы
$groupBy = json_decode($_POST["groupBy"]);          // название поля группировки
$orderBy = json_decode($_POST["orderBy"]);          // название поля сортировки
$order = $_POST["order"];                           // направление сортировки
$where = json_decode($_POST["where"]);              // array, название полей покоторым делаем поиск
$limit = $_POST["limit"];                           // максиммальное количество записей в результате, 0 - не ограничено

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
$result = selectView(
    $viewName,          // string, название view
    $params,            // параметры в формате json
    $keys,              // array, запрашиваемые поля
    $groupBy,           // string, поле по которому группируем
    $orderBy,           // string, поле по которому сортируем
    $order,             // направление сортировки
    $where,             // array, название полей покоторым делаем поиск
    $limit              // максиммальное количество записей в результате, 0 - не ограничено
);

plog('selectView result:', $result);

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