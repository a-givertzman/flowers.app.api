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

import { loadCss } from '../plugins/loader/load_css.js';
loadCss({path: './src/plugins/busy-indicator/busy.css'});
loadCss({path: './src/plugins/tom-select/tom-select.min.css'});
import '../plugins/tom-select/tom-select.complete.js';
import 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
import { ApiRequest } from '../infrastructure/api/api_request.js';
import { ContentOfPage } from '../classes/content_of_page.js';
// import { HtmlTable } from '../classes/html_table.js';
import { HtmlTableHeader } from '../classes/html_table_header.js';
import { HtmlTableCaption } from '../classes/html_table_caption.js';
import { BusyIndicator } from '../plugins/busy-indicator/busy.js';
import { PurchaseStatus } from '../domain/purchase_status.js';
import '../plugins/jsPDF-2.5.1/dist/jspdf.min.js';
// import '../plugins/jspdf-autotable/dist/jspdf.plugin.autotable.js';
import '../plugins/jsPDF-2.5.1/dist/jspdf.auto-table.min.js';
import '../plugins/jsPDF-2.5.1/pdf-fonts/Roboto-Regular-normal.js';

const baseUrl = '';                                     // for production version
// const baseUrl = 'https://u1489690.isp.regruhosting.ru/' // for local tests;

window.html2canvas = html2canvas;

// константы для доступа к API
const mySqlParamsForPurchaseSelect = {
    url: `${baseUrl}get-view`,
    tableName: 'purchase_preview', 
    params: '0', 
    keys: ['*'], 
    orderBy: 'id', 
    order: 'ASC', 
    where: [
        // {operator: 'where', field: 'id', cond: '=', value: 7},
        {operator: 'where', field: 'deleted', cond: 'is null', value: null},
    ], 
    limit: 0,
};
const mySqlParamsForOrdersGroups = {
    url: `${baseUrl}get-view`,
    tableName: 'orderView', 
    params: '0', 
    keys: ['*'],
    groupBy: 'client/id', 
    orderBy: 'client/id', 
    order: 'ASC', 
    where: [
        // {operator: 'where', field: 'client/id', cond: '=', value: 916},
        {operator: 'where', field: 'deleted', cond: 'is null', value: null},
    ], 
    limit: 0,
}
const mySqlParamsForOrders = {
    url: `${baseUrl}get-view`,
    tableName: 'orderView', 
    params: '0', 
    keys: ['*'],
    orderBy: 'id', 
    order: 'ASC', 
    where: [
        // {operator: 'where', field: 'client/id', cond: '=', value: 7},
        {operator: 'where', field: 'deleted', cond: 'is null', value: null},
    ], 
    limit: 0,
}
// const mySqlParamsForTransactions = {
//     url: `${baseUrl}get-view`,
//     tableName: 'clientTransactionView', 
//     params: '0', 
//     keys: ['*'],
//     orderBy: 'date', 
//     order: 'ASC', 
//     where: [
//         {operator: 'where', field: 'client/id', cond: '=', value: 7},
//         {operator: 'and', field: 'deleted', cond: 'is null', value: null},
//     ], 
//     limit: 0,
// }
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
const htmlSelectorOfPurchaseSelect = 'select.purchase-select';
const htmlSelectorOfGeneratePdf = '.generate-pdf-btn';
const htmlSelectorOfClientOrders = 'table.purchase-items';
const htmlSelectorOfClientTransactions = 'table.transaction-items';


window.addEventListener('load', (event) => {                       // ON LOAD WINDOW
    const cntentOfPage = new ContentOfPage([
        {
            name: 'generatePdf',
            obj: new GeneratePdf(
                htmlSelectorOfGeneratePdf,
                new ApiRequest(
                    mySqlParamsForPurchaseSelect,
                    new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
                )
            ), 
        },
        {
            name: 'purchaseSelector',
            obj: new PurchaseSelector(
                htmlSelectorOfPurchaseSelect,
                {placeholder: 'Выбери закупку'},
                new ApiRequest(
                    mySqlParamsForPurchaseSelect,
                    new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
                )
            )
        },
        {
            name: 'clientOrdersGroupBy',
            obj: new HtmlTableGroupBy(
                htmlSelectorOfClientOrders,
                new ApiRequest(
                    mySqlParamsForOrdersGroups,
                    new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
                )
            )
        },
        // {
        //     name: 'clientTransactions',
        //     obj: new HtmlTable(
        //         htmlSelectorOfClientTransactions,
        //         new HtmlTableHeader(
        //             HeaderForTransactionsHtml,
        //             new HtmlTableCaption(
        //                 'Выши транзакции',
        //                 'transaction-row-header'
        //             )
        //         ),
        //         new HtmlTableBody(
        //             new RowForTransactions(),
        //             new ApiRequest(
        //                 mySqlParamsForTransactions,
        //                 new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
        //             )
        //         ),
        //     )
        // }
    ]);
    window.cntentOfPage = cntentOfPage;
    
    console.log('cntentOfPage', cntentOfPage);
    cntentOfPage.purchaseSelector.render();
    // this.cntentOfPage = cntentOfPage;
    cntentOfPage.purchaseSelector.selector.on('change', id => {
        console.log('selected purchase_id:', id);
        const selectedId = Number(id);
        if (!isNaN(selectedId) && selectedId != 0) {
            var where = [
                {operator: 'where', field: 'purchase/id', cond: '=', value: selectedId},
                {operator: 'and', field: 'deleted', cond: 'is null', value: null},
            ];
            cntentOfPage.clientOrdersGroupBy.render(where);
        } else {
            cntentOfPage.clientOrdersGroupBy.clear();
        }
    });
});

// Классы
class HtmlTableGroupBy {
    constructor(parentSelector, dataSource) {
        console.log('[HtmlTableGroupedBy.constructor]');
        this.parentSelector = parentSelector;
        this.dataSource = dataSource;
        this.elem = document.querySelector(this.parentSelector)
    }
    async render(where) {
        console.log('[HtmlTableGroupBy.render] where:', where);
        this.elem.innerHTML = '';
        return this.dataSource.fetchData({where: where}).then(async data => {
            console.log('[HtmlTableGroupBy.render] data:', data);
            var lWhere = [...where];
            var lClause = {operator: 'and', field: 'client/id', cond: '=', value: null};
            lWhere.push(lClause);
            for(var key in data) {
                var row = data[key];
                const purchaseId = row['purchase/id'];
                const clientId = row['client/id'];
                const tHead = new HtmlTableHeader(
                    HeaderForOrdersHtml,
                    new HtmlTableCaption(
                        `[${clientId}] ${row['client/name']} | Закупка [${purchaseId}] ${row['purchase/name']}`,
                        'purchase-row-header',
                    ),
                ).render();
                const body = new HtmlTableBody(
                    new RowForOrders(),
                    new ApiRequest(
                        mySqlParamsForOrders,
                        new BusyIndicator('.busy-indicator', 'busy-indicator-hide'),
                    ),
                );
                lClause.value = clientId;
                const tBody = await body.render(lWhere);
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

var specialElementHandlers = {
    '#elementH': function (element, renderer) {
        return true;
    }
}
function convert_HTML_To_PDF() {
    const _elem = document.querySelector('.purchase-items');
  
    html2canvas(_elem, {
      useCORS: true,
      onrendered: function(canvas) {
        var pdf = jsPDF('p', 'pt', 'a4');
  
        var pageHeight = 980;
        var pageWidth = 900;
        for (var i = 0; i <= _elem.clientHeight / pageHeight; i++) {
          var srcImg = canvas;
          var sX = 0;
          var sY = pageHeight * i; // start 1 pageHeight down for every new page
          var sWidth = pageWidth;
          var sHeight = pageHeight;
          var dX = 0;
          var dY = 0;
          var dWidth = pageWidth;
          var dHeight = pageHeight;
  
          window.onePageCanvas = document.createElement("canvas");
          onePageCanvas.setAttribute('width', pageWidth);
          onePageCanvas.setAttribute('height', pageHeight);
          var ctx = onePageCanvas.getContext('2d');
          ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
  
          var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
          var width = onePageCanvas.width;
          var height = onePageCanvas.clientHeight;
  
          if (i > 0) // if we're on anything other than the first page, add another page
            pdf.addPage(612, 864); // 8.5" x 12" in pts (inches*72)
  
          pdf.setPage(i + 1); // now we declare that we're working on that page
          pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62)); // add content to the page
        }
              
        // Save the PDF
        pdf.save('report.pdf');
      }
    });
}
class GeneratePdf {
    constructor(htmlSelector, dataSource) {
        console.log('[GeneratePdf.constructor]');
        // this.emptyBalans = '-.--';
        this.htmlSelector = htmlSelector;
        this.dataSource = dataSource;
        this.elem = document.querySelector(this.htmlSelector);
        if (this.elem) {
            this.elem.innerHTML = `PDF`;
            this.elem.addEventListener('click', (event) => {
                console.log('[GeneratePdf.render] clicked:', event);
                const _elem = document.querySelector('.purchase-items');
                const pdfDoc = jspdf.jsPDF(
                    'p', 'pt', 'a4'// [_elem.offsetWidth * 2.1, 2500]
                    // {filters: ['ASCIIHexEncode']},
                );

                // const myFont = ... // load the *.ttf font file as binary string
                // doc.addFileToVFS("MyFont.ttf", myFont);
                pdfDoc.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular-normal", "normal");
                console.log('pdf fonts: ', pdfDoc.getFontList());
                pdfDoc.setFont("Roboto-Regular-normal");
                // pdfDoc.setFont("Helvetica");
                pdfDoc.setFontSize(10);

                console.log('[GeneratePdf.render] _elem.offsetWidth:', _elem.offsetWidth);
                // pdfDoc.setFont('Roboto', 'regular');
                const now = Date.now();
                pdfDoc.text(`Отчет report ${now.toString()}`, 10, 10);
                // convert_HTML_To_PDF();
                // pdfDoc.addFileToVFS('../../public/css/fonts/Roboto-Regular.ttf', 'Roboto');
                // pdfDoc.addFont('../../public/css/fonts/Roboto-Regular.ttf', 'Roboto', 'regular');

                const headers = [
                    // 'PrID',
                    'Группа',
                    'Нименование',
                    'Заказал',
                    'Получил',
                    // 'Цена закупки',
                    'Цена',
                    'Транспортные\nрасходы',
                    'Сумма к\nоплате',
                    'Оплатил',
                    'Сумма к\nвозврату',
                    'Возвращено',
                ];
                const data = [{
                    // PrID: '44',
                    group: 'Однолетние цветы',
                    name: 'Анемона Whirlwind',
                    ordered: '11',
                    distributed: '0',
                    // buyPrice: '0.79 EUR',
                    salePrice: '71.10\nRUB',
                    shipping: '6.00\nRUB',
                    toPay: '848.10',
                    payed: '1619.10',
                    toRefound: '0.00',
                    refounded: '0.00',
                }];

                // pdfDoc.autoTable({ html: 'table.purchase-items' });
                pdfDoc.autoTable({
                    columns:[
                    //   { header: 'PrID', dataKey: 'PrID' },
                      { header: 'Группа', dataKey: 'group' },
                      { header: 'Нименование', dataKey: 'name' },
                      { header: 'Заказал', dataKey: 'ordered' },
                      { header: 'Получил', dataKey: 'distributed' },
                    //   { header: 'Цена закупки', dataKey: 'buyPrice' },
                      { header: 'Цена', dataKey: 'salePrice' },
                      { header: 'Транспортные\nрасходы', dataKey: 'shipping' },
                      { header: 'Сумма к\nоплате', dataKey: 'toPay' },
                      { header: 'Оплатил', dataKey: 'payed' },
                      { header: 'Сумма к\nвозврату', dataKey: 'toRefound' },
                      { header: 'Возвращено', dataKey: 'refounded' },
                    ],
                    body: data,
                    margin:{top:25, left: 15, right: 15, bottom: 10},
                    styles: {font: 'Roboto-Regular-normal'},
                    // didDrawPage:function(data){
                    //  doc.text("TOLIST ARTICLES", 20, 30);
                    // }
                  });
                // pdfDoc.autoTable(10, 50,
                //     data,
                //     headers,
                // );
                pdfDoc.save('report.pdf');
            });
        }
    }
    render(where) {
        console.log('[GeneratePdf.render]');
        this.dataSource.fetchData({where: where}).then(data => {
            // console.log('[GeneratePdf.render] data:', data);
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

class PurchaseSelector {
    constructor(htmlSelector, params, dataSource) {
        console.log('[PurchaseSelector.constructor]');
        this.htmlSelector = htmlSelector;
        this.params = params;
        this.dataSource = dataSource;
        this.element = document.querySelector(this.htmlSelector);
        this.selector = new TomSelect(
            this.element,
            {
                placeholder: this.params.placeholder,
                valueField: 'id',
                labelField: 'title',
                searchField: ['id', 'title'],
                maxOptions: 1000,
            }
        );
    }
    render() {
        console.log('[PurchaseSelector.render]');
        this.dataSource.fetchData().then(data => {
            console.log('[PurchaseSelector.render] data:', data);
            this.selector.clear();
            for(var key in data) {
                let item = data[key];
                let itemStatus = (new PurchaseStatus(item.status)).text();
                this.selector.addOption({
                    id: item.id,
                    title: item.id + ' | ' + item.name + ' | ' + item.details + ' | ' + itemStatus
                });
            }
        });
        return 0;
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
        let distributed = row['distributed'] 
            ? row['distributed'] == 0
                ? ''
                : row['distributed']
            : '';
        let product_primary_price = row['product/primary_price'] ? row['product/primary_price'] : '';
        let product_primary_currency = row['product/primary_currency'] ? row['product/primary_currency'] : '';
        let purchase_content_sale_price = row['purchase_content/sale_price'] ? row['purchase_content/sale_price'] : '';
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
        console.log('[HtmlTableBody.constructor]');
        this.tableRowFor = tableRowFor;
        this.dataSource = dataSource;
    }
    render(where) {
        console.log('[HtmlTableBody.render]');
        return this.dataSource.fetchData({where: where}).then(data => {
            console.log('[HtmlTableBody.render] data:', data);
            let emptyMessage = typeof(data) == 'object' && Object.keys(data).length 
                ? '' 
                : `<th colspan="100">Нет записей</th>`;
            const tbodyHtml = `
                <tbody>
                    ${emptyMessage}
                </tbody>
            `;
            const tbody = document.createElement('tbody');
            tbody.innerHTML = tbodyHtml.trim();
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
        const orderId = row['order/id'] ? row['order/id'] : '';
        const purchaseName = row['purchase/name'] ? row['purchase/name'] : '-';
        const productName = row['product/name'] ? row['product/name'] : '-';
        const rowHtml = `
            <tr class="transaction-row">
                <td>${row['id']}</td>
                <td>${row['date']}</td>
                <td>${row['account_owner']}</td>
                <td>${row['value']} RUB</td>
                <td>${orderId}</td>
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