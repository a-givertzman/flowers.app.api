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
plog("-> addTransaction.php");

// загружаем настройки и
// подключаемся к серверу mysql
require_once './libPHP/mysql_utils.php';

plog('php://input:');
plog(file_get_contents( 'php://input' ));

plog('_REQUEST:');
plog($_REQUEST);

plog('_POST:');
plog($_POST);
$data = ($_POST['data']);
plog($data);
// получаем переданные параметры
$account_owner = json_decode($data["account_owner"]);      // Идентификатор счета организатора
$value = json_decode($data["value"]);                // Сумма транзакции
$purchase_member_id = json_decode($data["purchase_member/id"]);  // Идентификатор записи таблицы Участники закупки
$description = $data["description"];                           // Комментарий к транзакции
$client_id = json_decode($data["client/id"]);  // array, название полей покоторым делаем поиск
$client_account = json_decode($data["client_account"]);  // Баланс участниа после операции

plog('Recived and extracted parameters:');
plog("account_owner: $account_owner");
plog("value: $value");
plog("purchase_member_id: $purchase_member_id");
plog("description: $description");
plog("client_id: $client_id");
plog("client_account: $client_account");

// Делаем вызов хранимой процедуры
callProcedure('addTransaction', [
    $account_owner,         // Идентификатор счета организатора
    $value,                 // Сумма транзакции
    $purchase_member_id,    // Идентификатор записи таблицы Участники закупки
    $description,           // Комментарий к транзакции
    $client_id,             // array, название полей покоторым делаем поиск
    $client_account,        // Баланс участниа после операции    
]);


// проверяем были ли ошибки и передаем данные вызвывающей форме
$jsonText = [];                                                             // массив для передачи данных фронтенду
if ($errCount == 0) {
    // если все прошло без критичных ошибок
    
    $jsonText = array(                                                      // формируем набор данных и информацию об ошибках
        'data' => 0,
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