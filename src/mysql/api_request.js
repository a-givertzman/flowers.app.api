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
 * Класс делает запрос в базу данных.
 * @mySqlParams параметры запроса в объекте
 * {
        url: 'get_data.php',
        tableName: 'client', 
        keys: ['*'], 
        groupBy: '', 
        orderBy: 'id', 
        order: 'ASC', 
        where: [
            {operator: 'where', field: 'id', cond: '=', value: 7},
            {operator: 'and', field: 'deleted', cond: 'is null', value: null},
        ], 
        limit: 0,
   }
 * @returns Возвращает набор данных в объекте.
 */
export class ApiRequest {
    constructor(mySqlParams, busyIndicator) {
        console.log('[ApiRequest.constructor]');
        this.mySqlParams = mySqlParams;
        this.busy = busyIndicator;
    }

    fetchData(newParams = {}) {
        console.log('[ApiRequest.fetch]');
        this.busy.show();
        const args = this.mySqlParams;
        for (var key in newParams) {
            args[key] = newParams[key];
        }
        console.log('args:', args);
        const body = this.prepareFormData(args);
        const options = this.prepareFetchOptions(body);
        const url = args.url ? args.url : '';
        return fetch(url, options)
            .then(response => {
                // console.log('response:', response);
                return this.parseResponse(response)
                    .then(data => {
                        console.log('data: ', data);
                        this.busy.hide();
                        return data;
                    })
                    .catch(error => {
                        console.error('error:', error);
                        this.busy.hide();
                        return {}
                    });
            })
            .catch(error => {
                console.error('error:', error);
                this.busy.hide();
                return {};
            });
    }

    async parseResponse(response) {
        console.log('[ApiRequest.parseResponse]');
        console.log('response.status:', response.status);
        const responseCode = response.status;
        const jsonData = await response.json();
        // console.log('json data:', jsonData);
        const parsedData = (typeof(jsonData) == 'object') ? jsonData : JSON.parse(jsonData);
        const errCount = parsedData.errCount;
        console.log('errCount: ', errCount);
        if (errCount > 0) {
            const errDump = parsedData.errDump;
            console.log('errDump: ', errDump);
            alert('Ошибка сервера', errDump);
            var data = parsedData.data;
            return data;
        }
        if (responseCode >= 200 && responseCode < 400) {
            var data = parsedData.data;
            return data;
        } else {
            const responseText = response.statusText;
            alert('Ошибка', '[' + responseCode + '] ' + responseText);
        }        
    }

    prepareFormData(args) {
        console.log('[ApiRequest.prepareFormData]');
        const procedureName = args.procedureName ? args.procedureName : '';
        const tableName = args.tableName ? args.tableName : '';
        const params = args.params ? args.params : '0';
        const keys = args.keys ? args.keys : ['*'];
        const groupBy = args.groupBy ? args.groupBy : '';
        const orderBy = args.orderBy ? args.orderBy : 'id';
        const order = args.order ? args.order : 'ASC';
        const where = args.where ? args.where : [];
        const limit = args.limit ? args.limit : 0;
        var body = new FormData();
        body.append( "procedureName", JSON.stringify(procedureName) );
        body.append( "tableName", JSON.stringify(tableName) );
        body.append( "params", JSON.stringify(params) );
        body.append( "keys", JSON.stringify(keys) );
        body.append( "groupBy", JSON.stringify(groupBy) );
        body.append( "orderBy", JSON.stringify(orderBy) );
        body.append( "order", order );
        body.append( "where", JSON.stringify(where) );
        body.append( "limit", limit );
        return body;        
    }

    prepareFetchOptions(body) {
        console.log('[ApiRequest.prepareFetchOptions]');
        return {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            referrerPolicy: "unsafe-url", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: body      // body data type must match "Content-Type" header    };
        };
    }
}
