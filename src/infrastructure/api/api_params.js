"use strict";
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

/**
* Параметры для ApiRequest
*/
export class ApiParams {
    #isEmpty;
    constructor(params) {
        if (!params) throw SyntaxError('[ApiParams] parameter "params" is required');
        this['procedureName'] =  params['procedureName'] ?? '';
        this['tableName'] = params['tableName'] ?? '';
        this['params'] = params['params'] ?? '0';
        this['keys'] = params['keys'] ?? ['*'];
        this['groupBy'] = params['groupBy'] ?? '';
        this['orderBy'] = params['orderBy'] ?? 'id';
        this['order'] = params['order'] ?? 'ASC';
        this['where'] = params['where'] ?? [];
        this['limit'] = params['limit'] ?? 0;
        this.#isEmpty = false;
    }
    isEmpty = () => this.#isEmpty;
    static empty() {
        return new ApiParams({});
    }
    updateWith(params) {
        const newParams = {...this, params};
        //   for(const key in this) {
        //     newParams[key] = value;
        //   }
        return new ApiParams(newParams);
    }
    /**
    * Делает JSON.stringify для каждого параметра
    * и возвращает получившийся map
    */
    encode() {
        const map = {};
        for(const key in this) {
            map[key] = JSON.stringify(this[value]);
        }
        return map;
    }
}
