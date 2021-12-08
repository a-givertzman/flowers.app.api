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
include_once './api/Response.php';

/**
 * Makes reqoest to MySQL
 * @params, array of names of input parameters
 * with will be getted from the POST array
 * and decoded from json
 */
class PostParams {
    protected array $paramNames;
    protected array $params;
    function __construct(
        array $paramNames
    ) {
        $this->paramNames = $paramNames;
    }
    function getAll(): Response {
        $errCount = 0;
        $errDump = '';
        $this->params = [];
        try {
            plog("Параметры в _POST:");
            foreach ($this->paramNames as $paramName) {
                $postValue = isset($_POST[$paramName]) ? $_POST[$paramName] : '';
                $param = json_decode($postValue, true);
                $this->params[$paramName] = $param;
                plog("   $paramName: ", $param);
            }
        } catch (Exception $e) {
            $errCount++;
            $errDump .= preg_replace("/[\r\n\']/m", "", $e->getMessage()) . " | ";
            plog("Ошибка при получении данных из _POST: $errDump");
        }
        return new Response(
            $this->params,
            count($this->params),
            $errCount,
            $errDump
        );
    }
    function get(string $name) {
        return isset($this->params[$name]) ? $this->params[$name] : null;
    }
}