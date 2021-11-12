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

plog('callProcedure result:');
plog($result);

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


plog("addTransaction.php ->");