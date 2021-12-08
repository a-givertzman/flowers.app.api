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
class PurchaseProduct {
    protected $query;
    protected $mySqli;
    protected $input;
    function __construct(
        $query,
        $mySqli,
        $input,
    ) {
        $this->query = $query;
        $this->mySqli = $mySqli;
        $this->input = $input;
    }
    function fetch() {
        plog("-> fetch");
        $errCount = 0;
        $errDump = '';
        $query = $this->query->prepare();
        $mySqli = $this->mySqli;
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
            plog("Сервер вернул ошибку: $errDump");
        }
        plog("fetch ->");
        return new Response(
            $data,
            count($data),
            $errCount,
            $errDump,
        );
    }
}