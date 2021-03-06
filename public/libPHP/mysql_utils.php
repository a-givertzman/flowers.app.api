<?php


plog("====================================");
plog("-> mysql_utils.php");



// загружаем настройки и
require_once 'mysql_settings.key';




// -------------------------------------------------------
// Функция | Возвращает значение подготовленное для SQL запроса
//
function prepareValueToSQL($mySqli, $value) {
    plog("-> prepareValueToSQL");
    switch (gettype($value)) {
        case 'NULL':
            $resValue = 'null';
            break;
        case 'string':
            if ((strcasecmp($value, "null") == 0) || ($value == null)) {
                $resValue =  'null';
            } else {
                $resValue = $mySqli->real_escape_string($value);
                $resValue = "'$resValue'";
            }
            break;
        default:
            $resValue = $value;
    }
    return $resValue;
    plog("prepareValueToSQL ->");
}



// -------------------------------------------------------
// Функция | Возвращает ковычку если тип дпнных string
//
function quoteByDataType($value) {
    plog("-> quoteByDataType");
    switch (gettype($value)) {
        case 'string':
            if ((strcasecmp($value, "null") == 0) || ($value == null)) {
                $quote = "";
            } else {
                $quote = "'";
            }
            break;

        default:
            $quote = "";
    }
    return $quote;
    plog("quoteByDataType ->");
}



// -------------------------------------------------------
// Функция | Подключается к серверу mysql, используя глобальные настройки
//
function connect() {
    plog("-> connect");
    
    $timerStart = microtime(true);
    
    // используем глобальные настройки для подключения к БД
    global $db_host, $db_user, $db_pass, $db_name;
    global $errCount;
    global $errDump;

    plog("connecting to the mySql server on $db_host");

    // линк к серверу mysql
    $mySqli = new mysqli();

    // настройки подключения
    // $mysqli->options();

    // подключаемся к серверу
    $mySqli->real_connect($db_host, $db_user, $db_pass, $db_name);
    
    // проверяем ошибки подключения
    if ($mySqli->connect_errno) {
        $errCount++;
        $errDump .= "Ошибка подключения" .preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
        plog("Server reply error: $errDump");
        // exit();
    }

    // изменение набора символов на utf8
    if (!$mySqli->set_charset("utf8")) {
        $errCount++;
        $errDump .= "Ошибка подключения" .preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
        plog("Server reply error: $errDump");
        // exit();
    } else {
        $charset = $mySqli->character_set_name();
        plog("Текущий набор символов: $charset");
    }

    $timerEnd = microtime(true);
    plog('time elapsed: ' . ($timerEnd - $timerStart));

    plog("connect ->");
    return $mySqli;
}


// -------------------------------------------------------
// Функция | Возвращает where выражение для view,
//           формируется из массива параметров на входе:
//           [{ 
//             operator: 'where'/'or'/'and', 
//             field: 'fieldNmae',
//             cond: '=' / 'like' / '<' / '>'...etc,
//             value: eny value,
//           },...]
//
function viewWhereExpression($where) {
    plog("-> viewWhereExpression");
    $query = '';
    foreach ($where as $index => $clauese) {
        $clauese = (array) $clauese;
        $operator = $clauese['operator'];
        $field = $clauese['field'];
        $cond = $clauese['cond'];
        $value = $clauese['value'];
        $query .= "\n$operator `$field` $cond JSON_EXTRACT(viewParams(), '$.\"$field\"')";
    }
    plog("viewWhereExpression ->");
    return $query;
}


// -------------------------------------------------------
// Функция | Возвращает where выражение для select,
//           формируется из массива параметров на входе:
//           [{ 
//             operator: 'where'/'or'/'and', 
//             field: 'fieldNmae',
//             cond: '=' / 'like' / '<' / '>'...etc,
//             value: eny value,
//           },...]
//
function selectWhereExpression($where) {
    plog("-> selectWhereExpression");
    $query = '';
    foreach ($where as $index => $clauese) {
        $clauese = (array) $clauese;
        plog('clause: ', $clauese);
        $operator = $clauese['operator'];
        $table = isset($clauese['table']) ? ("`" . $clauese['table'] . "`.") : '';
        $field = $clauese['field'];
        $cond = $clauese['cond'];
        $value = isset($clauese['value']) ? $clauese['value'] : null;
        $query .= "\n$operator $table`$field` $cond";
        $query .= isset($value) ? " '$value'" : '';
    }
    plog("selectWhereExpression ->");
    return $query;
}



// -------------------------------------------------------
// Функция | Добавляет поля через разделитель
//
function addFields($query, $fields, $delimiter = ',') {
    // добавляем поля
    foreach($fields as $index => $fieldName) {
        $quote = ($fieldName == '*') ? '' : '`';
        $query .= "\n   " . $quote . $fieldName . $quote . $delimiter;
    }
    $query = preg_replace('/,$/', '', $query);        // убираем последнюю запятаю
    return $query;
}



// -------------------------------------------------------
// Функция | Делает один запрос SELECT в таблицу tabeName
//
function selectData(
    $tableName,             // string, название таблицы
    $field = [],            // array, запрашиваемые поля
    $orderField = 'id',     // string, поле по которому сортируем
    $order = 'ASC',         // направление сортировки
    $where = [],            // array of {operator: 'where'/'or'/'and', field: 'fieldNmae', cond: '=', value: value}
    $limit = 0              // максиммальное количество записей в результате, 0 - не ограничено
) {
    plog("-> selectData");
    global $errCount;
    global $errDump;
    
    // подключаемся к БД
    $mySqli = connect();
    
    // если подключение успешно
    if ($mySqli->connect_errno == 0) {
        $timerStart = microtime(true);

        $query = "SELECT";

        // добавляем поля
        $query = addFields($query, $field);

        // добавляем таблицу
        $query .= "\nFROM `$tableName`";
        
        // добавляем фильтацию к запросу
        $query .= selectWhereExpression($where);
    
        // добавляем сортировку к запросу
        $query .= "\nORDER BY `$orderField` $order";

        // добавляем лимит количества записей в результате
        $query .= ($limit > 0) 
            ? "\nLIMIT $limit;"
            : ';';

        plog("ЗАПРОС: ", $query);

        $data = [];

        // делаем запрос в БД
        if ($rows = $mySqli->query($query)) {
            // и если запрос выполнен успешно, то перебираем записи
            while($row = $rows->fetch_array(MYSQLI_ASSOC)){
                // и кладем каждую в массив
                $data[$row['id']] = $row;
            }
            $rows->close();
            plog(count($data) ."records successfully selected");
        } else {
            // если были ошибки
            $errCount++;
            $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
            plog("Server reply error: $errDump");
        }

        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else {
        // $data = false;
    }
    // закрываем подключение
    $mySqli->close();
    plog("selectData ->");
    return $data;
}



// -------------------------------------------------------
// Функция | Делает один запрос SELECT JOIN в таблицу tabeName
//
function selectJoinData(
    $tableName,             // string, название таблицы
    $field = [],            // array, запрашиваемые поля
    // $joinField = [],        // [joinTableName][joinField], ключи - название таблицы, элементы - названия полей в таблице присоединяемых данных
    $orderField = 'id',     // string, поле по которому сортируем
    $order = 'ASC',         // направление сортировки
    $where = [],            // array of {operator: 'where'/'or'/'and', field: 'fieldNmae', cond: '=', value: value}
    $limit = 0              // максиммальное количество записей в результате, 0 - не ограничено
) {
    plog("-> selectJoinData");

    global $errCount;
    global $errDump;

    // подключаемся к БД
    $mySqli = connect();

    // если подключение успешно
    if ($mySqli->connect_errno == 0) {
        $timerStart = microtime(true);

        $query = "SELECT";

        // добавляем поля таблицы $tableName
        $joinTable = [];    // названия связанных таблиц
        foreach($field as $index => $fieldName) {
            $fieldPart = explode('/', $fieldName);
            if (count($fieldPart) > 1) {
                $joinTableName = $fieldPart[0];
                $joinFieldName = $fieldPart[1] . (!empty($fieldPart[2]) ? ('/' . $fieldPart[2]) : '');
                if (!in_array($joinTableName, $joinTable)) {

                    array_push($joinTable, $joinTableName);
                }
                $query .= "\n   `$joinTableName`.`$joinFieldName` as '$joinTableName/$joinFieldName',";
            } else {

                $query .= "\n   `$tableName`.`$fieldName`,";
            }
        }
    
        $query = preg_replace('/,$/', '', $query);        // убираем последнюю запятаю
    
        // добавляем таблицу
        $query .= "\nFROM `$tableName`";

        // добавляем связанные таблицы
        foreach($joinTable as $index => $joinTableName) {
            if ($joinTableName != $tableName) {
                $query .= "\nLEFT JOIN  `$joinTableName` ON `$tableName`.`$joinTableName/id` = `$joinTableName`.`id`";
            }
        }

        // добавляем фильтацию к запросу
        $query .= selectWhereExpression($where);
    
        // добавляем сортировку к запросу
        $query .= "\nORDER BY `$orderField` $order";

        // добавляем лимит количества записей в результате
        $query .= ($limit > 0) 
            ? "\nLIMIT $limit;"
            : ';';

        plog("ЗАПРОС: ", $query);

        $data = [];

        // делаем запрос в БД
        // и запрос выполнен если успешно
        if ($rows = $mySqli->query($query)) {

            while($row = $rows->fetch_array(MYSQLI_ASSOC)){

                // и каждый кладем в массив
                $data[$row['id']] = $row;
            }
            $rows->close();

            plog(count($data) ."records successfully selected");

        } else {
            // если были ошибки
            $errCount++;
            $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
            plog("Server reply error: $errDump");
        }
        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else {
        // $data = false;
    }
    // закрываем подключение
    $mySqli->close();
    plog("selectJoinData ->");
    return $data;
}



// -------------------------------------------------------
// Функция | Делает один запрос INSERT в таблицу tableName
//
function insertData($tableName, &$data) {
    plog("-> insertData");

    global $errCount;
    global $errDump;

    // подключаемся к БД
    $mySqli = connect();

    // если подключение успешно
    if ($mySqli->connect_errno == 0) {
        $timerStart = microtime(true);

        // готовим запрос
        $query = "INSERT INTO `$tableName` (";
        
        // добавляем поля
        foreach($data as $fieldName => $value) {
            $query .= "\n   `$fieldName`,";
        }
        $query = preg_replace('/,$/', '', $query);        // убираем последнюю запятаю

        $query .= ")\nVALUES (";

        // добавляем значения
        foreach($data as $fieldName => $value) {

            $value = prepareValueToSQL($mySqli, $value);

            $query .= "\n   $value,";
        }
        $query = preg_replace('/,$/', '', $query);                        // удаляем запятую после последнего value

        $query .= "\n);";
        
        plog("ЗАПРОС: ", $query);
        
        // делаем запрос в БД
        // и если запрос выполнен успешно
        if ($mySqli->query($query)) {
            
            // id текущего элемента, если был INSERT
            $data_id = $mySqli->insert_id;
            
            plog("Record inserted successfully, id: " .$data_id);
        } else {
            // если были ошибки
            $data_id = false;
            $errCount++;
            $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
            plog("Server reply error: $errDump \nIn query: $query");
        }
        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else {
        $data_id = false;
    }
    // закрываем подключение
    $mySqli->close();
    plog("insertData ->");
    return $data_id;
}



// -------------------------------------------------------
// Функция | Делает один запрос UPDATE в таблицу tableName
//
function updateData($tableName, &$data) {
    plog("-> updateData");

    global $errCount;
    global $errDump;

    // подключаемся к БД
    $mySqli = connect();

    // если подключение успешно
    if ($mySqli->connect_errno == 0) {
        $timerStart = microtime(true);

        // готовим запрос
        $query = "UPDATE `$tableName` ";
        
        $query .= "\nSET ";

        // добавляем поле = значение
        foreach($data as $fieldName => $value) {

            if (strcasecmp($fieldName, "id") != 0) {                        // пропускаем поле id (PK)
                
                $value = prepareValueToSQL($mySqli, $value);
    
                $query .= "\n   `$fieldName` = $value,";
            }
        }
        $query = preg_replace('/,$/', '', $query);                        // удаляем запятую после последнего value
        
        $query .= "\nWHERE id = " .$data['id'] .";";

        plog("ЗАПРОС: ", $query);
        
        // делаем запрос в БД
        // и если запрос выполнен успешно
        if ($mySqli->query($query)) {
            
            // id текущего элемента, если был UPDATE
            $data_id = $data['id'];//$mySqli->insert_id;
            
            plog("Record updated successfully, id: " .$data_id);
            
        } else {
            // если были ошибки
            $data_id = false;
            $errCount++;
            $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
            plog("Server reply error: $errDump \nIn query: $query");
        }
        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else {
        $data_id = false;
    }
    // закрываем подключение
    $mySqli->close();
    plog("updateData ->");
    return $data_id;
}



// -------------------------------------------------------
// Функция | Делает один запрос INSERT ON DUBLIKATE KEY UPDATE в таблицу tableName
//
function insertOdkuData($tableName, $data, $ifExistsQuery = '') {
    plog(" -> insertOdkuData");
    plog("data: ", $data);
    global $errCount;
    global $errDump;
    
    // подключаемся к БД
    $mySqli = connect();
    
    plog("checking connection errors");
    // если подключение успешно
    if ($mySqli->connect_errno == 0) {
        plog("mysql connection ok");
        $timerStart = microtime(true);
        
        $id = $data['id'];
        
        // делаем запрос для проверки существует ли запись с указанным id
        $query = empty($ifExistsQuery)
            ? "SELECT * FROM `$tableName` WHERE `id` = $id LIMIT 1"
            : $ifExistsQuery;
        plog('query:', $query);

        if ($result = $mySqli->query($query)) {
            
            // $row = $result->fetch_row();                   // признак существования записи
            $row = $result->fetch_array(MYSQLI_ASSOC);          // признак существования записи
            $result->close();
            $exists = !empty($row);                             // признак существования записи
            plog('row: ', $row);

            if ($exists) {         // если такой записи нет
                $data['id'] = isset($row['id']) ? $row['id'] : 0;
                $data_id = updateData($tableName, $data);                   // делаем UPDATE
            } else {                    // если такая запись есть
                $data_id = insertData($tableName, $data);                   // делаем INSERT
            }
        } else {
            // если были ошибки
            $data_id = false;
            $errCount++;
            $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
            plog("Server reply error: $errDump");
        }
        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else { 
        $data_id = false;
        $errCount++;
        $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
        plog("Server reply error: $errDump");
    }
    // закрываем подключение
    $mySqli->close();
    plog("insertOdkuData ->");
    return $data_id;
}



// -------------------------------------------------------
// Функция | Делает вызов хранимой процедуры
//
function callProcedure($procedureName, $params) {
    plog("-> callProcedure");

    global $errCount;
    global $errDump;

    $data = null;

    // подключаемся к БД
    $mySqli = connect();

    // если подключение успешно
    if ($mySqli->connect_errno == 0) {
        $timerStart = microtime(true);

        // готовим запрос
        $query = "call `$procedureName`(";
        
        // добавляем параметры
        foreach($params as $paramName => $value) {
                
            $value = prepareValueToSQL($mySqli, $value);

            $query .= "\n   $value,";
        }
        $query = preg_replace('/,$/', '', $query);                        // удаляем запятую после последнего value
        
        $query .= "\n);";
        
        plog("ЗАПРОС: ", $query);
        
        // делаем запрос в БД
        // и если запрос выполнен успешно
        if ($result = $mySqli->query($query)) {

            $data = $result->fetch_row()[0];                              // результат выполнения процедуры

            plog("Procedure called with result: ", $data);
        } else {
            // если были ошибки
            $errCount++;
            $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
            plog("Server reply error: $errDump \nIn query: $query");
        }
        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else {
        // $data = 'MySQL connection erroe';
    }
    // закрываем подключение
    $mySqli->close();
    plog("callProcedure ->");
    return $data;
}



// -------------------------------------------------------
// Функция | Делает один запрос SELECT в таблицу tabeName
//
function selectView(
    $viewName,              // string, название view
    $params = '',           // параметры в формате json
    $field = [],            // array, запрашиваемые поля
    $groupBy = '',          // string, поле по которому группируем
    $orderBy = 'id',        // string, поле по которому сортируем
    $order = 'ASC',         // направление сортировки
    $where = [],            // array, название полей покоторым делаем поиск
    $limit = 0              // максиммальное количество записей в результате, 0 - не ограничено
) {
    plog("-> selectView");
    global $errCount;
    global $errDump;
    
    // подключаемся к БД
    $mySqli = connect();
    
    // если подключение успешно
    if ($mySqli->connect_errno == 0) {
        $timerStart = microtime(true);

        // передаем параметры для view в формате json
        plog("params: ", $params);
        $query = "set @viewParams = " . $params . ";";
        plog("ЗАПРОС: ", $query);

        if ($result = $mySqli->query($query)) {

            $query = "SELECT";

            // добавляем поля
            $query = addFields($query, $field);
        
            // добавляем таблицу
            $query .= "\nFROM `$viewName`";
    
            // добавляем фильтацию к запросу
            // if ($params) {
                // $query .= viewWhereExpression($where);
            // } else {
                $query .= selectWhereExpression($where);
            // }
            
            // добавляем группировку к запросу
            if (!empty($groupBy)) {
                $query .= "\nGROUP BY `$groupBy`";
            }
            
            // добавляем сортировку к запросу
            $query .= "\nORDER BY `$orderBy` $order";
    
            // добавляем лимит количества записей в результате
            $query .= ($limit > 0) 
                ? "\nLIMIT $limit;"
                : ';';
    
            plog("ЗАПРОС: ", $query);
    
            $data = [];
    
            // делаем запрос в БД
            if ($rows = $mySqli->query($query)) {
                // и запрос выполнен если успешно, перебираем записи
                while($row = $rows->fetch_array(MYSQLI_ASSOC)){
                    // и кладем каждую в массив
                    $data[$row['id']] = $row;
                }
                $rows->close();
    
                plog(count($data) ." records successfully selected");
            } else {
                // если были ошибки
                $errCount++;
                $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
                plog("Server reply error: $errDump");
            }
        } else {
            // если были ошибки
            $errCount++;
            $errDump .= preg_replace("/[\r\n\']/m", "", $result) . " | ";
            $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
            plog("Server reply error: $errDump \nIn query: $query");
        }
        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else {
        // $data = false;
    }
    // закрываем подключение
    $mySqli->close();
    plog("selectView ->");
    return $data;
}



plog("mysql_utils.php ->");
plog("====================================");
?>