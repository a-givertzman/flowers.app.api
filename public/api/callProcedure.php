<?php
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2021 Anton Lobanov

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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