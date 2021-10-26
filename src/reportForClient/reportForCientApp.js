"use strict";

// константы для доступа к API
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
const mySqlParamsForOrdersGroups = {
    url: 'getView.php',
    tableName: 'purchaseMemberView', 
    params: '0', 
    keys: ['*'],
    groupBy: 'purchase/id', 
    orderBy: 'purchase/id', 
    order: 'ASC', 
    where: [
        {operator: 'where', field: 'client/id', cond: '=', value: 7},
        {operator: 'and', field: 'deleted', cond: 'is null', value: null},
    ], 
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
// Константы для заголовков таблиц
const HeaderForOrdersHtml = `
    <tr class="purchase-row">
    <th>PrID</th>
    <th>Группа</th>
    <th>Нименование</th>
    <th><span>Заказал</span></th>
    <th><span>Получил</span></th>
    <th>Цена закупки</th>
    <th>Цена</th>
    <th><span>Транспортные<br>расходы</span></th>
    <th><span>Сумма к<br>оплате</span></th>
    <th><span>Оплатил</span></th>
    <th><span>Сумма к<br>возврату</span></th>
    <th><span>Возвращено</span></th>
    </tr>
`;
const HeaderForTransactionsHtml = `
    <tr class="transaction-row">
        <th>id</th>
        <th>Дата</th>
        <th>Организатор</th>
        <th><span>Сумма</span></th>
        <th>PuM/id</th>
        <th>Закупка</th>
        <th>Товар</th>
        <th>Комментарий</th>
        <th><span>Баланс после<br>операции</span></th>
    </tr>
`;

// Константы для поиска элементов в DOM
const htmlSelectorOfClientBalans = '#client-account';
const htmlSelectorOfClientSelect = 'select.client-select';
const htmlSelectorOfClientOrders = 'table.purchase-items';
const htmlSelectorOfClientTransactions = 'table.transaction-items';


window.addEventListener('load', (event) => {                       // ON LOAD WINDOW
    const cntentOfPage = new ContentOfPage([
        {
            name: 'clientBalans',
            obj: new ClientBalas(
                htmlSelectorOfClientBalans,
                new ApiRequest(
                    mySqlParamsForClientBalans,
                    new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
                )
            ), 
        },
        {
            name: 'clientSelector',
            obj: new Selector(
                htmlSelectorOfClientSelect,
                {placeholder: 'Найди себя'},
                new ApiRequest(
                    mySqlParamsForClientSelect,
                    new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
                )
            )
        },
        {
            name: 'clientOrders',
            obj: new HtmlTableGroupBy(
                htmlSelectorOfClientOrders,
                new ApiRequest(
                    mySqlParamsForOrdersGroups,
                    new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
                )
            )
        },
        {
            name: 'clientTransactions',
            obj: new HtmlTable(
                htmlSelectorOfClientTransactions,
                new HtmlTableHeader(
                    HeaderForTransactionsHtml,
                    new HtmlTableCaption(
                        'Выши транзакции'
                    )
                ),
                new HtmlTableBody(
                    new RowForTransactions(),
                    new ApiRequest(
                        mySqlParamsForTransactions,
                        new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
                    )
                ),
            )
        }
    ]);
    
    console.log('cntentOfPage', cntentOfPage);
    cntentOfPage.clientSelector.render();
    
    cntentOfPage.clientSelector.selectr.on('change', id => {
        console.log('selected id:', id);
        const selectedId = Number(id);
        if (!isNaN(selectedId) && selectedId != 0) {
            var where = [
                {operator: 'where', field: 'id', cond: '=', value: selectedId},
                {operator: 'and', field: 'deleted', cond: 'is null', value: null},
            ];
            cntentOfPage.clientBalans.render(where);

            where = [
                {operator: 'where', field: 'client/id', cond: '=', value: selectedId},
                {operator: 'and', field: 'deleted', cond: 'is null', value: null},
            ];
            cntentOfPage.clientOrders.render(where);

            where = [
                {operator: 'where', field: 'client/id', cond: '=', value: selectedId},
                {operator: 'and', field: 'deleted', cond: 'is null', value: null},
            ];
            cntentOfPage.clientTransactions.render(where);
        } else {
            cntentOfPage.clientBalans.clear();
            cntentOfPage.clientOrders.clear();
            cntentOfPage.clientTransactions.clear();
        }
    });
});





// Классы
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
        const tbody = await this.body.render(params);
        this.elem = this.parentSelector 
            ? document.querySelector(this.parentSelector)
            : document.createElement('table');
        this.elem.innerHTML = '';
        this.elem.appendChild(thead);
        this.elem.appendChild(tbody);
        return this.elem;
    }
    clear() {
        if (this.elem) this.elem.innerHTML = '';
    }
}

class HtmlTableHeader {
    constructor(html, caption) {
        console.log('[HtmlTableHeader.constructor]');
        this.html = html;
        this.caption = caption;
    }
    render(caption) {
        console.log('[HtmlTableHeader.render]');
        caption = caption ? caption : this.caption;
        // const html = `
        //     <thead>
        //         ${this.html}
        //     </thead>
        // `;
        const elem = document.createElement('thead');
        elem.innerHTML = this.html;
        elem.appendChild(
            this.caption.render()
        );
        return elem;
    }
}

class HtmlTableCaption {
    constructor(text) {
        console.log('[HtmlTableCaption.constructor]');
        this.text = text;
    }
    render(text) {
        console.log('[HtmlTableCaption.render]');
        text = text ? text : this.text;
        const html = `
            <tr class="transaction-row-header">
                <th colspan="100">${text}</th>
            </tr>
        `;
        const elem = document.createElement('tr');
        elem.innerHTML = html.trim();
        return elem;
    }
}

class HtmlTableGroupBy {
    constructor(parentSelector, dataSource) {
        console.log('[HtmlTableGroupedBy.constructor]');
        this.parentSelector = parentSelector;
        this.dataSource = dataSource;
        this.elem = document.querySelector(this.parentSelector)
    }
    async render(where) {
        console.log('[HtmlTableGroupBy.render]');
        console.log('[HtmlTableGroupBy.render] where:', where);
        this.elem.innerHTML = '';
        return this.dataSource.fetchData({where: where}).then(async data => {
            console.log('[HtmlTableGroupBy.render] data:', data);
            var lWhere = [...where];
            var lClause = {operator: 'and', field: 'purchase/id', cond: '=', value: null};
            lWhere.push(lClause);
            for(var key in data) {
                var row = data[key];
                const purchaseId = row['purchase/id'];
                const tHead = new HtmlTableHeader(
                    HeaderForOrdersHtml,
                    new HtmlTableCaption(
                        `Закупка [${purchaseId}] ${row['purchase/name']}`
                    )
                ).render();
                const body = new HtmlTableBody(
                    new RowForOrders(),
                    new ApiRequest(
                        mySqlParamsForOrders,
                        new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
                    )
                );
                lClause.value = purchaseId;
                const tBody = await body.render(lWhere);
                console.log('[HtmlTableGroupBy.render] tHead:', tHead);
                console.log('[HtmlTableGroupBy.render] tBody:', tBody);
                this.elem.appendChild(tHead);
                this.elem.appendChild(tBody);
            }
            return this.elem;
        });
    }
    clear() {
        if (this.elem) this.elem.innerHTML = '';
    }
}

class ClientBalas {
    constructor(htmlSelector, dataSource) {
        console.log('[ClientBalas.constructor]');
        this.emptyBalans = '-.--';
        this.htmlSelector = htmlSelector;
        this.dataSource = dataSource;
        this.elem = document.querySelector(this.htmlSelector);
        if (this.elem) this.elem.innerHTML = `Баланс: ${this.emptyBalans} RUB`;
    }
    render(where) {
        console.log('[ClientBalas.render]');
        this.dataSource.fetchData({where: where}).then(data => {
            // console.log('[ClientBalas.render] data:', data);
            let clientAccount
            try {
                clientAccount = Object.values(data)[0]['account'];
            } catch (error) {
                clientAccount = this.emptyBalans;
            }
            this.elem.innerHTML = `Баланс: ${clientAccount} RUB`;
        });
    }
    clear() {
        this.elem = document.querySelector(this.htmlSelector);
        if (this.elem) this.elem.innerHTML = `Баланс: ${this.emptyBalans} RUB`;
    }
}

class Selector {
    constructor(htmlSelector, params, dataSource) {
        console.log('[Selector.constructor]');
        this.htmlSelector = htmlSelector;
        this.params = params;
        this.dataSource = dataSource;
        this.element = document.querySelector(this.htmlSelector);
        this.selectr = new TomSelect(
            this.element,
            {
                placeholder: 'Найди себя',//this.params.placeholder,
                valueField: 'id',
                labelField: 'title',
                searchField: ['id', 'title'],
                maxOptions: 1000,
            }
        );
    }
    render() {
        console.log('[Selector.render]');
        this.dataSource.fetchData().then(data => {
            // console.log('[Selector.render] data:', data);
            this.selectr.clear();
            for(var key in data) {
                let item = data[key];
                this.selectr.addOption({
                    id: item.id,
                    title: item.id + ' | ' + item.name
                });
            }
        });
        return 0;
    }
}

class BodyForOrders {
    constructor(rowForOrders) {
        console.log('[BodyForOrders.constructor]');
        this.rowForOrders = rowForOrders;
        this.headerData = '--';
    }
    render() {
        console.log('[BodyForOrders.render]');
        const tbodyHtml = `
            <tbody>
            </tbody>
        `;
        this.tbody = document.createElement('tbody');
        this.tbody.innerHTML = tbodyHtml.trim();
        return this.tbody;
    }
    renderRow(row) {
        console.log('[BodyForOrders.renderRow]');
        return this.tbody.appendChild(
            this.rowForOrders.render(row)
        );
    }
    renderSubTotal(subTotal, subTotalPaid) {
        if (subTotal) {
            return this.renderRow(
                {
                    'product/name': 'Итог по закупке:', 
                    cost: subTotal, 
                    paid: subTotalPaid
                }
            )
        }
    }
}

class CaptionForTable {
    constructor(captionText) {
        console.log('[CaptionForTable.constructor]');
        this.captionText = captionText;
    }
    render(captionText) {
        console.log('[CaptionForTable.render]');
        captionText = captionText ? captionText : this.captionText;
        const html = `
            <tr class="purchase-row-header">
                <th colspan="100">${captionText}</th>
            </tr>
        `;
        const elem = document.createElement('tr');
        elem.innerHTML = html.trim();
        return elem;
    }
}

class HeaderForOrders {
    constructor(row) {
        console.log('[HeaderForOrders.constructor]');
        this.row = row;
    }
    render(row) {
        console.log('[HeaderForOrders.render]');
        row = row ? row : this.row;
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
                    <th><span>Транспортные<br>расходы</span></th>
                    <th><span>Сумма к<br>оплате</span></th>
                    <th><span>Оплатил</span></th>
                    <th><span>Сумма к<br>возврату</span></th>
                    <th><span>Возвращено</span></th>
                </tr>
            </thead>
        `;
        const thead = document.createElement('thead');
        thead.innerHTML = theadHtml.trim();
        return thead;
    }
}

class RowForOrders {
    constructor(row) {
        console.log('[RowForOrders.constructor]');
        this.row = row;
    }
    render(row) {
        console.log('[RowForOrders.render]');
        row = row ? row : this.row;
        let product_id = row['product/id'] ? row['product/id'] : '';
        let product_group = row['product/group'] ? row['product/group'] : '';
        let product_name = row['product/name'] ? row['product/name'] : '';
        let count = row['count'] ? row['count'] : '';
        let distributed = row['distributed'] ? row['distributed'] : '';
        let product_primary_price = row['product/primary_price'] ? row['product/primary_price'] : '';
        let product_primary_currency = row['product/primary_currency'] ? row['product/primary_currency'] : '';
        let purchase_content_sale_price = row['purchase_content/sale_price'] ? row['purchase_content/sale_price'] : '';
        let purchase_content_sale_currency = row['purchase_content/sale_currency'] ? row['purchase_content/sale_currency'] : '';
        let purchase_content_shipping = row['purchase_content/shipping'] ? row['purchase_content/shipping'] : '';
        let cost = row['cost'] ? row['cost'] : '';
        let paid = row['paid'] ? row['paid'] : '';
        let torefound = row['torefound'] ? row['torefound'] : '';
        let refounded = row['refounded'] ? row['refounded'] : '';

        let rowHtml = `
        <tr class="purchase-row">
            <td>${product_id}</td>
            <td>${product_group}</td>
            <td>${product_name}</td>
            <td>${count}</td>
            <td>${distributed}</td>
            <td>
                ${product_primary_price}
                ${product_primary_currency}
            </td>
            <td>
                ${purchase_content_sale_price}
                ${purchase_content_sale_currency}
            </td>
            <td>${purchase_content_shipping}</td>
            <td>${cost}</td>
            <td class="paid">${paid}</td>
            <td class="torefound">${torefound}</td>
            <td class="refounded">${refounded}</td>
        </tr>
        `;
        let newRow = document.createElement('tr');
        newRow.innerHTML = rowHtml.trim();
        return newRow;        
    }
}

class HtmlTableBody {
    constructor(tableRowFor, dataSource) {
        console.log('[BodyForTransactions.constructor]');
        this.tableRowFor = tableRowFor;
        this.dataSource = dataSource;
    }
    render(where) {
        console.log('[BodyForTransactions.render]');
        return this.dataSource.fetchData({where: where}).then(data => {
            const tbodyHtml = `
                <tbody>
                </tbody>
            `;
            const tbody = document.createElement('tbody');
            tbody.innerHTML = tbodyHtml.trim();
            // console.log('[BodyForTransactions.render] data:', data);
            for(var key in data) {
                var row = data[key];
                var trow = this.tableRowFor.render(row);
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
    render(row) {
        console.log('[RowForTransactions.render]');
        row = row ? row : this.row;
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