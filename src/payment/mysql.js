"use strict";

/**
 * select в базу данных
 * с параметрами в одном объекте:
 * @param Object 
 * {
 *     tableName: 'tableName', 
 *     keys: ['*'], 
 *     orderBy: 'id', 
 *     order: 'ASC', 
 *     where: [], 
 *     limit: 0,
 * }
 * @returns Promise<Response>
 */
export function getData(args) {
    console.log('[mysql.getData]');
    args.url = args.url ? args.url : domainPath + 'get-data';
    return apiRequest(args);
}

export function getJoinData(args) {
  console.log('[musql.getJoinData]');
  args.url = args.url ? args.url : domainPath + 'get-join-data';
  return apiRequest(args);
}

/**
 * select из view
 * с параметрами в одном объекте:
 * @param Object 
 * {
 *     tableName: 'tableName', 
 *     params: '0', 
 *     keys: ['*'],
 *     orderBy: 'fieldName', 
 *     order: 'ASC', 
 *     where: [{operator: 'where', field: 'fieldName', cond: '=', value: fieldValue}], 
 *     limit: 0,
 * }
 * @returns Promise<Response>
 */
export function getView(args) {
    console.log('[mysql.getView]');
    args.url = args.url ? args.url : domainPath + 'get-view';
    return apiRequest(args);
}

/**
 * Вызов хранимой процедуры 
 * с параметрами, передаваемыми:
 * @param Object 
 * {
 *     procedureName: 'procedureName', 
 *     params: [param1, param2,...], 
 * }
 * @returns Promise<Response>
 */
export function callProcedure(args) {
    console.log('[mysql.callProcedure]');
    args.url = args.url ? args.url : domainPath + 'call-procedure';
    return apiRequest(args);
}

// export {getData, getJoinData, getView};

export async function apiRequest(args) {
    console.log('[mysql.apiRequest]');
    console.log('args:', args);

    var procedureName = args.procedureName ? args.procedureName : '';
    var tableName = args.tableName ? args.tableName : '';
    var params = args.params ? args.params : '0';
    var keys = args.keys ? args.keys : ['*'];
    var orderBy = args.orderBy ? args.orderBy : 'id';
    var order = args.order ? args.order : 'ASC';
    var where = args.where ? args.where : [];
    var limit = args.limit ? args.limit : 0;
    var url = args.url ? args.url : '';

    var body = new FormData();
    body.append( "procedureName", JSON.stringify(procedureName) );
    body.append( "tableName", JSON.stringify(tableName) );
    body.append( "params", JSON.stringify(params) );
    body.append( "keys", JSON.stringify(keys) );
    body.append( "orderBy", JSON.stringify(orderBy) );
    body.append( "order", JSON.stringify(order) );
    body.append( "where", JSON.stringify(where) );
    body.append( "limit", JSON.stringify(limit) );
    console.log('body:', body);
    const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
    //   'Content-Type': 'application/json'
    //   'Content-Type': 'application/x-www-form-urlencoded',
        // 'Access-Control-Allow-Origin' : '*',
    },
    // redirect: 'follow', // manual, *follow, error
    referrerPolicy: "unsafe-url", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: body}; // body data type must match "Content-Type" header    };
    console.log('options:', options);

    var response = await fetch(url, options);

    // console.log('response data:', response);
    const responseCode = response.status;
    
    const jsonData = await response.json();
    // console.log('json data:', jsonData);
    
    const parsedData = (typeof(jsonData) == 'object') ? jsonData : JSON.parse(jsonData);
    
    var errCount = parsedData.errCount;
    // console.log('errCount: ', errCount);

    if (errCount > 0) {
        var errDump = parsedData.errDump;
        console.log('errDump: ', errDump);
        alert('Ошибка сервера', errDump);
        return {};
    }
    
    if (responseCode >= 200 && responseCode < 400) {
        var data = parsedData.data;
        // console.log('data: ', data);
        return data;
    } else {
        var responseText = response.statusText;
        alert('Ошибка', '[' + responseCode + '] ' + responseText);
    }
}