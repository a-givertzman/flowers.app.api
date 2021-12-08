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

declare(strict_types = 1);
/**
 * Prepare the connection to MySQL 
 * Returns Response class contains connection instance in the field data 
 * on errors return the error information in errCount and errDump fields
 */
class MySqlConnect {
    protected $db_host;
    protected $db_name;
    protected $db_user;
    protected $db_pass;
    protected $errCount;
    protected $errDump;
    function __construct(
        $db_host, 
        $db_name,
        $db_user, 
        $db_pass 
    ) {
        $this->db_host = $db_host;
        $this->db_name = $db_name;
        $this->db_user = $db_user;
        $this->db_pass = $db_pass;
    }
    function connect(): Response {
        // plog("[MySqlConnect.connect]");
        $errCount = 0;
        $errDump = '';
        $timerStart = microtime(true);
        plog("connecting to the mySql server on $this->db_host");
        // линк к серверу mysql
        $mySqli = new mysqli();
        // настройки подключения
        // $mysqli->options();
        // подключаемся к серверу
        $mySqli->real_connect(
            $this->db_host, 
            $this->db_user, 
            $this->db_pass, 
            $this->db_name
        );
        // проверяем ошибки подключения
        if ($mySqli->connect_errno) {
            $errCount++;
            $errDump .= "Ошибка подключения" .preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
            plog("Сервер вернул ошибку: $errDump");
        }
    
        // изменение набора символов на utf8
        if (!$mySqli->set_charset("utf8")) {
            $errCount++;
            $errDump .= "Ошибка подключения" .preg_replace("/[\r\n\']/m", "", $mySqli->error) . " | ";
            plog("Сервер вернул ошибку: $errDump");
        } else {
            $charset = $mySqli->character_set_name();
            plog("Текущий набор символов: $charset");
        }
    
        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
    
        plog("connect ->");
        return new Response(
            $mySqli,
            $mySqli->connect_errno ? 0 : 1,
            $errCount,
            $errDump
        );
    }
}