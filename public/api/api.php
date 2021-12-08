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
class API {
    protected $query;
    protected $mySqli;
    protected $sqlQuery;
    function __construct(
        $query,
        $mySqli,
        $sqlQuery
     ) {
        $this->query = $query;
        $this->mySqli = $mySqli;
        $this->sqlQuery = $sqlQuery;
     }
    function fetch(): Response {
        $errCount = 0;
        $errDump = '';
        $timerStart = microtime(true);
        $mySqli = $this->mySqli->connect();
        if ($mySqli->hasErrors()) {
            return new Response(
                [],
                0,
                $mySqli->errCount,
                $mySqli->errDump,
            );
        }
        $response = new Response(
            $this->$mySqli->query(),
            $this->$mySqli->affected_rows,
            $mySqli->errCount,
            $mySqli->errDump
        );
        // закрываем подключение
        $mySqli->close();
        $timerEnd = microtime(true);
        plog('time elapsed: ' . ($timerEnd - $timerStart));
        return $response;
    }
}