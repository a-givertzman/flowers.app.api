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
plog("-> callProcedure.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

// plog('php://input:');
// plog(file_get_contents( 'php://input' ));

// plog('_REQUEST:');
// plog($_REQUEST);

plog('_POST: ', $_POST);

// получаем переданные параметры
$procedureName = json_decode($_POST["procedureName"]);      // название процедурв
$params = isset($_POST['params'])                           // массив параметров
    ? json_decode($_POST['params'])
    : null;

plog('Recived and extracted parameters:');
plog("procedureName: ", $procedureName);
plog("params: ", $params);

// Делаем вызов хранимой процедуры
$result = callProcedure( 
    $procedureName,         // Идентификатор счета организатора
    $params,                // массив параметров
);

plog('callProcedure result:', $result);

if ($result != 0) {
    $errCount++;
    $errDump .= preg_replace("/[\r\n\']/m", "", $result) . " | ";
    $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
    plog("Server reply error: $errDump \nIn query: $query");
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

plog("callProcedure.php ->");