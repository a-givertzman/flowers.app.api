"use strict";

window.addEventListener('load', (event) => {                       // ON LOAD WINDOW
    const where = [
        {operator: 'where', field: 'client/id', cond: '=', value: 7},
        {operator: 'and', field: 'deleted', cond: 'is null', value: null},
    ];
    const mySqlParamsForOrders = {
        tableName: 'purchaseMemberView', 
        params: '0', 
        keys: ['*'],
        orderBy: 'purchase/id', 
        order: 'ASC', 
        where: where, 
        limit: 0,
    }

    const reportForClientContainerElem = document.querySelector('.purchase-selector .container');
    const reportForClientElem = document.createElement('div');
    reportForClientContainerElem.appendChild(reportForClientElem);
    const reportForClient = new ReportForClient(
        reportForClientElem,
        new Selector(
            '.search-purchase-select',
            "Найди себя"
        ),
        new HtmlTable(
            new HeaderForOrders({
                'purchase/id': '???',
                'purchase/name': 'Пока нет названия закупки'
            }),
            new BodyForOrders(
                new OrdersData(
                    new SqlQuery(
                        new ApiRequest(mySqlParamsForOrders)
                    )
                )
            )
        ),
        // new HtmlTable(
        //     new HeaderForTransactions({
        //         'client/id': '???',
        //         'client/name': 'Пока нет имени клиента'
        //     }),
        //     new BodyForTransactions()
        // )
    );
    reportForClient.render();
});


class HeaderForTransactions {
    constructor(row) {
        console.log('[HeaderForTransactions.constructor]');
        this.row = row;
    }
    render() {
        console.log('[HeaderForTransactions.render]');
        let row = this.row;
        let theadHtml = `
            <thead>
                <tr class="transaction-row-header">
                    <th colspan="100">Ваши транзакции [${row['client/id']}] ${row['client/name']}</th>
                </tr>
                <tr class="transaction-row">
                    <th>id</th>
                    <th>Дата</th>
                    <th>Организатор</th>
                    <th><span>Сумма</span></th>
                    <th>PuM/id</th>
                    <th>Закупка</th>
                    <th>Товар</th>
                    <th>Комментарий</th>
                    <th><span>Баланс после операции</span></th>
                </tr>
            </thead>
        `;
        var thead = document.createElement('thead');
        thead.innerHTML = theadHtml.trim();
        return thead;
    }
}

class BodyForTransactions {
    constructor(ordersData) {
        console.log('[BodyForTransactions.constructor]');
        this.ordersData = ordersData;
    }
    render() {
        console.log('[BodyForTransactions.render]');
        let row = this.row;
        var tbodyHtml = `
            <tbody>
            </tbody>
        `;
        var tbody = document.createElement('tbody');
        tbody.innerHTML = tbodyHtml.trim();
        return tbody;
    }
}

class RowForTransactions {
    constructor(row) {
        console.log('[RowForTransactions.constructor]');
        this.row = row;
    }
    render() {
        console.log('[RowForTransactions.render]');
        let row = this.row;
        let rowHtml = `
        <tr class="purchase-row">
            <td>${row['product/id']}</td>
            <td>${row['product/group']}</td>
            <td>${row['product/name']}</td>
            <td>${row['count']}</td>
            <td>${row['distributed']}</td>
            <td>
                ${row['product/primary_price']}
                ${row['product/primary_currency']}
            </td>
            <td>
                ${row['purchase_content/sale_price']}
                ${row['purchase_content/sale_currency']}
            </td>
            <td>${row['purchase_content/shipping']}</td>
            <td>${row['cost']}</td>
            <td class="paid">${row['paid']}</td>
            <td class="torefound">${row['torefound']}</td>
            <td class="refounded">${row['refounded']}</td>
        </tr>
        `;
        let newRow = document.createElement('tr');
        newRow.innerHTML = rowHtml.trim();
        return newRow;        
    }
}


class ReportForClient {
    constructor(containerElem, selector, orders, transactions) {
        console.log('[ReportForClient.constructor]');
        this.containerElem = containerElem;
        this.selector = selector;
        this.orders = orders;
        this.transactions = transactions;
    }
    render() {
        console.log('[ReportForClient.render]');
        const selectorElem = this.selector?.render();
        const ordersElem = this.orders?.render();
        const transactionsElem = this.transactions?.render();
        // this.containerElem.appendChild(selectorElem);
        this.containerElem.appendChild(ordersElem);
        // this.containerElem.appendChild(transactionsElem);
        return 0;
    }
}

class Selector {
    constructor(htmlSelector, placeholder) {
        this.htmlSelector = htmlSelector;
        this.placeholder = placeholder;
    }
    render() {
        // $(function() {
            return $(this.htmlSelector).select2({
                placeholder: this.placeholder,
                width: '100%', // need to override the changed default
                multiple: false,
                allowClear: true,
                matcher: select2match,
                sorter: select2sort,
            });
        // });
        return 0;
    }
}

class HtmlTable {
    constructor(header, body) {
        console.log('[HtmlTable.constructor]');
        this.header = header;
        this.body = body;
    }
    render() {
        console.log('[HtmlTable.render]');
        const thead = this.header.render();
        const tbody = this.body.render();
        const elem = document.createElement('table');
        elem.appendChild(thead);
        elem.appendChild(tbody);
        return elem;
    }
}

class HeaderForOrders {
    constructor(row) {
        console.log('[HeaderForOrders.constructor]');
        this.row = row;
    }
    render() {
        console.log('[HeaderForOrders.render]');
        let row = this.row;
        let theadHtml = `
            <thead>
                <tr class="purchase-row-header">
                    <th colspan="100">Закупка [${row['purchase/id']}] ${row['purchase/name']}</th>
                </tr>
                <tr class="purchase-row">
                    <th>PrID</th>
                    <th>Группа</th>
                    <th>Нименование</th>
                    <th><span>Заказал</span></th>
                    <th><span>Получил</span></th>
                    <th>Цена закупки</th>
                    <th>Цена</th>
                    <th><span>Транспортные расходы</span></th>
                    <th><span>Сумма к оплате</span></th>
                    <th><span>Оплатил</span></th>
                    <th><span>Сумма к возврату</span></th>
                    <th><span>Возвращено</span></th>
                </tr>
            </thead>
        `;
        var thead = document.createElement('thead');
        thead.innerHTML = theadHtml.trim();
        return thead;
    }
}

class BodyForOrders {
    constructor(ordersData) {
        console.log('[BodyForOrders.constructor]');
        this.ordersData = ordersData;
    }
    render() {
        console.log('[BodyForOrders.render]');
        const tbodyHtml = `
            <tbody>
            </tbody>
        `;
        const tbody = document.createElement('tbody');
        tbody.innerHTML = tbodyHtml.trim();
        const ordersDataRows = this.ordersData.getRows();
        for(var key in ordersDataRows) {
            const row = ordersDataRows[key];
            const trow = new RowForOrders(row).render();
            tbody.appendChild(trow);
        }
        return tbody;
    }
}

class RowForOrders {
    constructor(row) {
        console.log('[RowForOrders.constructor]');
        this.row = row;
    }
    render() {
        console.log('[RowForOrders.render]');
        let row = this.row;
        let rowHtml = `
        <tr class="purchase-row">
            <td>${row['product/id']}</td>
            <td>${row['product/group']}</td>
            <td>${row['product/name']}</td>
            <td>${row['count']}</td>
            <td>${row['distributed']}</td>
            <td>
                ${row['product/primary_price']}
                ${row['product/primary_currency']}
            </td>
            <td>
                ${row['purchase_content/sale_price']}
                ${row['purchase_content/sale_currency']}
            </td>
            <td>${row['purchase_content/shipping']}</td>
            <td>${row['cost']}</td>
            <td class="paid">${row['paid']}</td>
            <td class="torefound">${row['torefound']}</td>
            <td class="refounded">${row['refounded']}</td>
        </tr>
        `;
        let newRow = document.createElement('tr');
        newRow.innerHTML = rowHtml.trim();
        return newRow;        
    }
}

class OrdersData {
    constructor(sqlQuery) {
        console.log('[OrdersData.constructor]');
        this.sqlQuery = sqlQuery;
    }
    getRows() {
        console.log('[OrdersData.getRows]');
        return this.sqlQuery.exequte();
    }
}

class SqlQuery {
    constructor(apiRquest) {
        console.log('[SqlQuery.constructor]');
        this.apiRquest = apiRquest;
    }
    exequte() {
        console.log('[SqlQuery.exequte]');
        return this.apiRquest.fetchData();
    }
}

class ApiRequest {
    constructor(mySqlParams) {
        console.log('[ApiRequest.constructor]');
        this.mySqlParams = mySqlParams;
    }

    async fetchData() {
        console.log('[ApiRequest.fetch]');
        const args = this.mySqlParams;
        console.log('args:', args);
        const body = this.prepareFormData(args);
        const options = this.prepareFetchOptions(body);
        console.log('body:', body);
        console.log('options:', options);
        const url = args.url ? args.url : '';
        const response = await fetch(url, options);
        console.log('response:', response);
        return await this.parseResponse(response);
    }

    async parseResponse(response) {
        console.log('[ApiRequest.parseResponse]');
        const responseCode = response.status;
        
        const jsonData = await response.json();
        // console.log('json data:', jsonData);
        
        const parsedData = (typeof(jsonData) == 'object') ? jsonData : JSON.parse(jsonData);
        
        const errCount = parsedData.errCount;
        // console.log('errCount: ', errCount);
    
        if (errCount > 0) {
            const errDump = parsedData.errDump;
            console.log('errDump: ', errDump);
            alert('Ошибка сервера', errDump);
            return {};
        }
        if (responseCode == 200) {
            var data = parsedData.data;
            // console.log('data: ', data);
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
        const orderBy = args.orderBy ? args.orderBy : 'id';
        const order = args.order ? args.order : 'ASC';
        const where = args.where ? args.where : [];
        const limit = args.limit ? args.limit : 0;
    
        var body = new FormData();
        body.append( "procedureName", JSON.stringify(procedureName) );
        body.append( "tableName", JSON.stringify(tableName) );
        body.append( "params", JSON.stringify(params) );
        body.append( "keys", JSON.stringify(keys) );
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



// =====================================================

function select2sort(results) {
    var query = $('.select2-search__field').val().toLowerCase();
    return results.sort(function(a, b) {
      return a.text.toLowerCase().indexOf(query) -
        b.text.toLowerCase().indexOf(query);
    });
}

function select2match(params, data) {
    // If there are no search terms, return all of the data
    if ($.trim(params.term) === '') {
      return data;
    }
    // Do not display the item if there is no 'text' property
    if (typeof data.text === 'undefined') {
      return null;
    }
    // `params.term` should be the term that is used for searching
    // `data.text` is the text that is displayed for the data object
    if (data.text.toLowerCase().indexOf(params.term.toLowerCase()) > -1) {
      var modifiedData = $.extend({}, data, true);
      modifiedData.text.replace(params.term, '<span class="search_term_hilite">' + params.term + '</span>');
      // You can return modified objects from here
      // This includes matching the `children` how you want in nested data sets
      return modifiedData;
    }
    // Return `null` if the term should not be displayed
    return null;
}
