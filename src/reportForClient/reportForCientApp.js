"use strict";
const mySqlParamsForClientBalans = {
    url: 'getData.php',
    tableName: 'client', 
    keys: ['*'], 
    orderBy: 'id', 
    order: 'ASC', 
    where: [
        {operator: 'where', field: 'id', cond: '=', value: 7},
        {operator: 'and', field: 'deleted', cond: 'is null', value: null},
    ], 
    limit: 0,
};
const mySqlParamsForClientSelect = {
    url: 'getData.php',
    tableName: 'client', 
    keys: ['*'], 
    orderBy: 'id', 
    order: 'ASC', 
    where: [{operator: 'where', field: 'deleted', cond: 'is null', value: null},], 
    limit: 0,
}
const mySqlParamsForOrders = {
    url: 'getView.php',
    tableName: 'purchaseMemberView', 
    params: '0', 
    keys: ['*'],
    orderBy: 'purchase/id', 
    order: 'ASC', 
    where: [
        {operator: 'where', field: 'client/id', cond: '=', value: 7},
        {operator: 'and', field: 'deleted', cond: 'is null', value: null},
    ], 
    limit: 0,
}
const mySqlParamsForTransactions = {
    url: 'getView.php',
    tableName: 'clientTransactionView', 
    params: '0', 
    keys: ['*'],
    orderBy: 'date', 
    order: 'ASC', 
    where: [
        {operator: 'where', field: 'client/id', cond: '=', value: 7},
        {operator: 'and', field: 'deleted', cond: 'is null', value: null},
    ], 
    limit: 0,
}

const htmlSelectorOfClientBalans = '#client-account';
const htmlSelectorOfClientSelect = 'select.search-purchase-select';
const htmlSelectorOfClientOrders = 'table.purchase-items';
const htmlSelectorOfClientTransactions = 'table.transaction-items';

window.addEventListener('load', (event) => {                       // ON LOAD WINDOW
    const cntentOfPage = new ContentOfPage([
        {
            name: 'clientBalans',
            obj: new ClientBalas(
                htmlSelectorOfClientBalans,
                new ApiRequest(mySqlParamsForClientBalans)
            ), 
        },
        {
            name: 'clientSelector',
            obj: new Selector(
                htmlSelectorOfClientSelect,
                {placeholder: "Найди себя"},
                new ApiRequest(mySqlParamsForClientSelect)
            )
        },
        {
            name: 'clientOrders',
            obj: new HtmlTable(
                htmlSelectorOfClientOrders,
                new HeaderForOrders({
                    'purchase/id': '???',
                    'purchase/name': 'Пока нет названия закупки'
                }),
                new BodyForOrders(
                    new ApiRequest(mySqlParamsForOrders)
                )
            ),
        },
        {
            name: 'clientTransactions',
            obj: new HtmlTable(
                htmlSelectorOfClientTransactions,
                new HeaderForTransactions({
                    'client/id': '???',
                    'client/name': 'Пока нет имени клиента'
                }),
                new BodyForTransactions(
                    new ApiRequest(mySqlParamsForTransactions)
                )
            )
        },
    ]);
    
    console.log('cntentOfPage', cntentOfPage);
    cntentOfPage.clientSelector.render();
    
    
    $(htmlSelectorOfClientSelect).on('select2:select', e => {
        console.log('selection id:', e.params.data);
        
        var selectedId = e.params.data.id;
        
        cntentOfPage.clientBalans.render({id: selectedId});
        cntentOfPage.clientOrders.render({id: selectedId});
        cntentOfPage.clientTransactions.render({id: selectedId});
    });

    $(htmlSelectorOfClientSelect).on('select2:unselect', e => {
        clearTablesContent(['table.purchase-items', 'table.transaction-items']);
    });

});

class ContentOfPage {
    constructor(arrayOfHmlSections = []) {
        console.log('[ContentOfPage.constructor]');
        arrayOfHmlSections.forEach(htmlSection => {
            this[htmlSection.name] = htmlSection.obj;
        });
    }
    render() {
        console.log('[ContentOfPage.render]');
        this.arrayOfHmlSections.forEach(htmlSection => {
            htmlSection.render();
        });
        return 0;
    }
}

class HtmlTable {
    constructor(parentSelector, header, body) {
        console.log('[HtmlTable.constructor]');
        this.parentSelector = parentSelector;
        this.header = header;
        this.body = body;
    }
    async render(params = {}) {
        console.log('[HtmlTable.render]');
        const thead = this.header.render();
        const tbody = await this.body.render();
        const elem = this.parentSelector 
            ? document.querySelector(this.parentSelector)
            : document.createElement('table');
        elem.innerHTML = '';
        elem.appendChild(thead);
        elem.appendChild(tbody);
        return elem;
    }
}

class ClientBalas {
    constructor(htmlSelector, dataSource) {
        console.log('[ClientBalas.constructor]');
        this.htmlSelector = htmlSelector;
        this.dataSource = dataSource;
        this.elem = document.querySelector(this.htmlSelector);
        this.elem.innerHTML = `Баланс: -.-- RUB`;
    }
    render(id) {
        console.log('[ClientBalas.render]');
        const where = [
            {operator: 'where', field: 'id', cond: '=', value: id},
            {operator: 'and', field: 'deleted', cond: 'is null', value: null},
        ];
        this.dataSource.fetchData({where: where}).then(data => {
            console.log('[ClientBalas.render] data:', data);
            let clientAccount = Object.values(data)[0]['account'];
            this.elem.innerHTML = `Баланс: ${clientAccount} RUB`;
        });
    }
}

class Selector {
    constructor(htmlSelector, params, dataSource) {
        console.log('[Selector.constructor]');
        this.htmlSelector = htmlSelector;
        this.params = params;
        this.dataSource = dataSource;
        $(this.htmlSelector).select2({
            placeholder: this.params.placeholder,
            width: '100%', // need to override the changed default
            multiple: false,
            allowClear: true,
            matcher: select2match,
            sorter: select2sort,
        });
    }
    render() {
        this.dataSource.fetchData().then(data => {
            console.log('[Selector.render] data:', data);
            $(this.htmlSelector).val(null).trigger('change');
            for(var key in data) {
                let item = data[key];
                $(this.htmlSelector)
                    .append(new Option(item.id + ' | ' + item.name, item.id, false))
                    .trigger('change');
            }
        });
        return 0;
    }
}

class BodyForOrders {
    constructor(dataSource) {
        console.log('[BodyForOrders.constructor]');
        this.dataSource = dataSource;
    }
    render(params = {}) {
        console.log('[BodyForOrders.render]');
        const tbodyHtml = `
            <tbody>
            </tbody>
        `;
        const tbody = document.createElement('tbody');
        tbody.innerHTML = tbodyHtml.trim();
        const where = [
            {operator: 'where', field: 'client/id', cond: '=', value: params.id},
            {operator: 'and', field: 'deleted', cond: 'is null', value: null},
        ];
        return this.dataSource.fetchData({where: where}).then(data => {
            console.log('[BodyForOrders.render] data:', data);
            for(var key in data) {
                var row = data[key];
                var trow = new RowForOrders(row).render();
                tbody.appendChild(trow);
            }
            return tbody;
        });
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

class HeaderForTransactions {
    constructor(row) {
        console.log('[HeaderForTransactions.constructor]');
        this.row = row;
    }
    render() {
        console.log('[HeaderForTransactions.render]');
        const row = this.row;
        const theadHtml = `
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
        const thead = document.createElement('thead');
        thead.innerHTML = theadHtml.trim();
        return thead;
    }
}

class BodyForTransactions {
    constructor(dataSource) {
        console.log('[BodyForTransactions.constructor]');
        this.dataSource = dataSource;
    }
    render(params) {
        console.log('[BodyForTransactions.render]');
        const tbodyHtml = `
            <tbody>
            </tbody>
        `;
        const tbody = document.createElement('tbody');
        tbody.innerHTML = tbodyHtml.trim();
        const where = [
            {operator: 'where', field: 'client/id', cond: '=', value: params.id},
            {operator: 'and', field: 'deleted', cond: 'is null', value: null},
        ];
        return this.dataSource.fetchData({where: where}).then(data => {
            console.log('[BodyForTransactions.render] data:', data);
            for(var key in data) {
                var row = data[key];
                var trow = new RowForTransactions(row).render();
                tbody.appendChild(trow);
            }
            return tbody;
        });
    }
}

class RowForTransactions {
    constructor(row) {
        console.log('[RowForTransactions.constructor]');
        this.row = row;
    }
    render() {
        console.log('[RowForTransactions.render]');
        const row = this.row;
        const purchaseMemberId = row['purchase_member/id'] ? row['purchase_member/id'] : '';
        const purchaseName = row['purchase/name'] ? row['purchase/name'] : '-';
        const productName = row['product/name'] ? row['product/name'] : '-';
        const rowHtml = `
            <tr class="transaction-row">
                <td>${row['id']}</td>
                <td>${row['date']}</td>
                <td>${row['account_owner']}</td>
                <td>${row['value']} RUB</td>
                <td>${purchaseMemberId}</td>
                <td>${purchaseName}</td>
                <td>${productName}</td>
                <td>${row['description']}</td>
                <td>${row['client_account']} RUB</td>
            </tr>
        `;
    
        const newRow = document.createElement('tr');
        newRow.innerHTML = rowHtml.trim();
        return newRow;        
    }
}


class HeaderForOrders {
    constructor(row) {
        console.log('[HeaderForOrders.constructor]');
        this.row = row;
    }
    render() {
        console.log('[HeaderForOrders.render]');
        const row = this.row;
        const theadHtml = `
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
        const thead = document.createElement('thead');
        thead.innerHTML = theadHtml.trim();
        return thead;
    }
}

class ApiRequest {
    constructor(mySqlParams) {
        console.log('[ApiRequest.constructor]');
        this.mySqlParams = mySqlParams;
    }

    fetchData(newParams = {}) {
        console.log('[ApiRequest.fetch]');
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
                        return data;
                    })
                    .catch(error => {
                        console.error('error:', error);
                        return {}
                    });
            })
            .catch(error => {
                console.error('error:', error);
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
            return {};
        }
        if (responseCode == 200) {
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