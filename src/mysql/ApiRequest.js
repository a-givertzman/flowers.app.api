"use strict";
/**
 * Класс делает запрос в базу данных.
 * @mySqlParams параметры запроса в объекте
 * {
        url: 'getData.php',
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
class ApiRequest {
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