<?php


// plog("|----------------------------------------------------------------|");
// plog("|                     mysql_utils.php                            |");



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
// Функция | Делает один запрос SELECT в таблицу tabeName
//
function selectData(
    $tableName,             // string, название таблицы
    $field = [],            // array, запрашиваемые поля
    $orderField = 'id',     // string, поле по которому сортируем
    $order = 'ASC',         // направление сортировки
    $searchField = [],      // array, название полей покоторым делаем поиск
    $searchQuery = "%",     // string, строка которую ищем в полях $searchField
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
        foreach($field as $index => $fieldName) {
            if ($index < count($field) - 1) {
    
                $query .= "\n   `$fieldName`,";
            } else {
                
                $query .= "\n   `$fieldName`";
            }
        }
    
        // добавляем таблицу
        $query .= "\nFROM `$tableName`";

        // добавляем фильтацию к запросу
        $searchQuery = $searchQuery == '' ? "%" : $searchQuery;
        foreach($searchField as $index => $field) {
            if ($index == 0) {
    
                $query .= "\nWHERE `$field` LIKE '$searchQuery'";
            } else {
                
                $query .= "\nOR `$field` LIKE '$searchQuery'";
            }
        }
    
        // добавляем сортировку к запросу
        $query .= "\nORDER BY `$orderField` $order";

        // добавляем лимит количества записей в результате
        $query .= ($limit > 0) 
            ? "\nLIMIT $limit;"
            : ';';

        // $query .= ';';

        plog("ЗАПРОС:");
        plog($query);

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

        // закрываем подключение
        $mySqli->close();

        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else {
        
        $data = false;
    }
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
    $searchField = [],      // array, название полей покоторым делаем поиск
    $searchQuery = "%",     // string, строка которую ищем в полях $searchField
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
    
        // убираем последнюю запятаю
        $query = substr($query, 0, -1);
    
        // добавляем таблицу
        $query .= "\nFROM `$tableName`";

        // добавляем связанные таблицы
        foreach($joinTable as $index => $joinTableName) {
            if ($joinTableName != $tableName) {
                $query .= "\nLEFT JOIN  `$joinTableName` ON `$tableName`.`$joinTableName/id` = `$joinTableName`.`id`";
            }
        }

        // добавляем фильтацию к запросу
        $searchQuery = $searchQuery == '' ? "%" : $searchQuery;
        foreach($searchField as $index => $field) {
            if ($index == 0) {
    
                $query .= "\nWHERE `$tableName`.`$field` LIKE '$searchQuery'";
            } else {
                
                $query .= "\nOR `$tableName`.`$field` LIKE '$searchQuery'";
            }
        }
    
        // добавляем сортировку к запросу
        $query .= "\nORDER BY `$orderField` $order";

        // добавляем лимит количества записей в результате
        $query .= ($limit > 0) 
            ? "\nLIMIT $limit;"
            : ';';

        // $query .= ';';

        plog("ЗАПРОС:");
        plog($query);

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

        // закрываем подключение
        $mySqli->close();

        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else {
        
        $data = false;
    }
    plog("selectData ->");
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
        $query = "INSERT INTO $tableName (";
        
        // добавляем поля
        $index = 0;
        foreach($data as $fieldName => $value) {
            if ($index < count($data) - 1) {
    
                $query .= "\n   `$fieldName`,";
            } else {
                
                $query .= "\n   `$fieldName`";
            }
            $index++;
        }

        $query .= ")\nVALUES (";

        // добавляем значения
        $index = 0;
        foreach($data as $fieldName => $value) {

            $value = prepareValueToSQL($mySqli, $value);

            $query .= "\n   $value,";

            $index++;
        }

        $query = substr_replace($query, '', - 1, 1);                        // удаляем запятую после последнего value

        $query .= "\n);";
        
        plog("ЗАПРОС:");
        plog($query);
        
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
        
        // закрываем подключение
        $mySqli->close();


        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else {
        
        $data_id = false;
    }
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
        $query = "UPDATE $tableName ";
        
        $query .= "\nSET ";

        // добавляем поле = значение
        $index = 0;
        foreach($data as $fieldName => $value) {

            if (strcasecmp($fieldName, "id") != 0) {                        // пропускаем поле id (PK)
                
                $value = prepareValueToSQL($mySqli, $value);
    
                $query .= "\n   `$fieldName` = $value,";
            }
            
            $index++;
        }

        $query = substr_replace($query, '', - 1, 1);                        // удаляем запятую после последнего value
        
        $query .= "\nWHERE id = " .$data['id'] .";";

        // $query .= "\n;";
        
        plog("ЗАПРОС:");
        plog($query);
        
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
        
        // закрываем подключение
        $mySqli->close();

        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else {
        
        $data_id = false;
    }
    plog("updateData ->");
    return $data_id;
}



// -------------------------------------------------------
// Функция | Делает один запрос INSERT ON DUBLIKATE KEY UPDATE в таблицу tableName
//
function insertOdkuData($tableName, $data) {
    plog(" -> insertOdkuData");
    
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
        
        plog("select to $tableName where id=$id");
        // делаем запрос для проверки существует ли запись с таким же id
        $query = "SELECT EXISTS(SELECT 1 FROM $tableName WHERE `id` = $id LIMIT 1)";

        if ($result = $mySqli->query($query)) {
            
            $exists = $result->fetch_row()[0];                              // признак существования записи

            $result->close();

            if ($exists == 0) {         // если такой записи нет

                // делаем INSERT
                $data_id = insertData($tableName, $data);                   // делаем INSERT
            } else {                    // если такая запись есть
                
                $data_id = updateData($tableName, $data);                   // делаем UPDATE
            }
        } else {
            // если были ошибки
            $data_id = false;
            $errCount++;
            $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
            plog("Server reply error: $errDump");
        }
        
        // закрываем подключение
        $mySqli->close();

        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    } else { 

        $data_id = false;
        $errCount++;
        $errDump .= preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
        plog("Server reply error: $errDump");
    }
    plog("insertOdkuData ->");
    return $data_id;
}



// plog("|                     mysql_utils.php                            |");
// plog("|----------------------------------------------------------------|");

?>