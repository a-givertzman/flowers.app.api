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
 * Класс упаковывает данные и информацию об ошибках в один объект
 * @data объект с данными
 * @errCount количество ошибок
 * @errDump строка с сообщениями об ошибках, разделитель |
 */
class Response {
    protected $data;
    protected $dataCount;
    protected $errCount;
    protected $errDump;
    function __construct(
        $data,
        int $dataCount,
        int $errCount,
        string $errDump
    ) {
        $this->data = $data;
        $this->dataCount = $dataCount;
        $this->errCount = $errCount;
        $this->errDump = $errDump;
    }
    function getData() {
        return $this->data;
    }
    function hasData(): bool {
        return $this->dataCount > 0;
    }
    function hasErrors(): bool {
        return $this->errCount > 0;
    }
    function errMessage(): string {
        return $this->errDump;
    }
    function toJson(): string {
        return json_encode(
            array(
                'data' => $this->data,
                'dataCount' => $this->dataCount,
                'errCount' => $this->errCount,
                'errDump' => $this->errDump
            )
        );
    }
}