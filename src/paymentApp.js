"use strict";

const domainPath = '';//'../../'; http://u1489690.isp.regruhosting.ru/

var data = null;
var orderData = {};
var clientData = {};
var purchaseData = {};
var busyIndicator;

function matchCustom(params, data) {
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
    if (data.text.indexOf(params.term) > -1) {
      var modifiedData = $.extend({}, data, true);
      modifiedData.text.replace(params.term, '<span class="search_term_hilite">' + params.term + '</span>');
      // You can return modified objects from here
      // This includes matching the `children` how you want in nested data sets
      return modifiedData;
    }
    // Return `null` if the term should not be displayed
    return null;
}

$(function() {
    console.log("[paymentApp.$('.search-purchase-select').select2]");
    $('.search-purchase-select').select2({
        placeholder: "Выбери закупку",
        width: '100%', // need to override the changed default
        multiple: false,
        allowClear: true,
        matcher: matchCustom
    });
});


const app_form = document.querySelector('#booking-form');
const dateInput = document.querySelector('#date-input');
const timeInput = document.querySelector('#time-input');
const daurationInput = document.querySelector('#dauration-input');
const addressInput = document.querySelector('#address-input');
const workDescriptionInput = document.querySelector('#work-description-input');
const submitBtn = document.querySelector('#submit-btn');
const authBtn = document.querySelector('#auth-btn');
const showAllBtn = document.querySelector('#show-all-btn');
const showMenuBtn = document.querySelector('#header-menu-btn');


var USER = {};
var ID_TOKEN;
var signInWindow;

//
var isValid = false;
// submitBtn.disabled = true;
let date = new Date();
// dateInput.value = date;
// timeInput.value = `${date.getHours()}:${date.getMinutes()}`;


window.addEventListener(                                            // ON LOAD WINDOW
    'load', (event) => {
        console.log('[paymentApp.window.addEventListener]');
        busyIndicator = new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
        
        // загружаем список закупок
        busyIndicator.show();
        var where = [{operator: 'where', field: 'deleted', cond: 'is null', value: null},];
        getData({
            tableName: 'purchase', 
            keys: ['*'], 
            orderBy: 'id', 
            order: 'ASC', 
            where: where, 
            limit: 0,
        }).then( responseData => {
            data = responseData;
            for(var key in data) {
                let item = data[key];
                $('.search-purchase-select')
                    .append(new Option(item.id + ' | ' + item.name + ' | ' + item.detales + ' | ' + item.status, item.id, false))
                    .trigger('change');
            }
            busyIndicator.hide();
        }).catch( e => {
            busyIndicator.hide();
        });

        // загружаем информацию по выбранной закупке
        $('.search-purchase-select').on('select2:select', e => {
            clearTablesContent(['table.purchase-items', 'table.purchase-clients']);
            
            var selectedId = e.params.data.id;
            
            // закупки клиента
            busyIndicator.show();
            var where = [
                {operator: 'where', field: 'purchase/id', cond: '=', value: selectedId},
                {operator: 'and', field: 'deleted', cond: 'is null', value: null},
            ];
            getView({
                tableName: 'orderView', 
                params: '0', 
                keys: ['*'],
                orderBy: 'purchase/id', 
                order: 'ASC', 
                where: where, 
                limit: 0,
            }).then( responseData => {
                orderData = responseData;
                // console.log('responseData:', responseData);
                var table = document.querySelector('table.purchase-items');
                var tableBody;

                // выбираем закупки
                purchaseData = objectRemoveDuplicated(responseData, 'product/id');
                // выбираем клиентов
                clientData = objectRemoveDuplicated(responseData, 'client/id');
                console.log('purchaseData:', purchaseData);
                if (Object.keys(purchaseData).length > 0) {
                    // добавляем в таблицу заголовок
                    var newPurchase = renderPurchaseHeader({});
                    table.append(newPurchase.thead);
                    table.append(newPurchase.tbody);
                    tableBody = newPurchase.tbody;

                    // перебираем позиции закупки
                    for (let key in purchaseData) {
                        let rowData = purchaseData[key];
                        let row = renderPurchaseRow(rowData);
                        tableBody.append(row);
                        row.querySelector(`#chbx${rowData['purchase_content/id']}`)?.addEventListener('change', (e) => {
                            onPurchaseListChanged(
                                e.target,                   // чекбокс в позиции списка товаров закупки
                                orderData,
                                clientData, 
                                'table.purchase-clients'    // селектор таблицы клиентов
                            );
                        });                
                    }

                    // добавляем в таблицу заголовок спика клиентов
                    var table = document.querySelector('table.purchase-clients');
                    var newClient = renderClientHeader({});
                    table.append(newClient.thead);
                    table.append(newClient.tbody);
                    tableBody = newClient.tbody;

                    // выводим данные клиентов в таблицу
                    for (let key in clientData) {
                        let rowData = clientData[key];
                        let row = renderClientRow(rowData);
                        tableBody.append(row);
                        console.log('clientDataRow:', row);
                    }   
                    
                    // обновляем сумму оплаты по всем позициям закупки для всех клиентов
                    updateClientTotalCost(clientData, orderData, 'table.purchase-clients');

                    let submitPaymentBtn = document.querySelector('#purchase-selector-btn');
                    submitPaymentBtn.classList.remove('disabled');
                    submitPaymentBtn.addEventListener('click', e => {
                        e.preventDefault();
                        onSubmitPaymentClicked(e, selectedId, orderData);
                    });
                }
                busyIndicator.hide();
            }).catch(e => {
                busyIndicator.hide();
            });
        });
        
        $('.search-purchase-select').on('select2:unselect', e => {
            clearTablesContent(['table.purchase-items', 'table.purchase-clients']);
        });
});


function clearTablesContent(selectors) {
    console.log('[paymentApp.clearTablesContent]');
    let table;
    selectors.forEach(tableSelector => {
        table = document.querySelector(tableSelector);
        if (table) table.innerHTML = '';
    });
}


function objectRemoveDuplicated(data, keyField) {
    console.log('[paymentApp.objectRemoveDuplicated]');
    const resultData = {};
    const keySet = new Set();
    for (var key in data) {
        const row = data[key];
        if (!keySet.has(Number(row[keyField]))) {
            resultData[key] = row;
        }
        keySet.add(Number(row[keyField]));
    }
    return resultData;
}


function onPurchaseListChanged(orderRowCheckBox, orderData, 
    clientData, clientTableSelector
) {
    console.log('[paymentApp.onPurchaseListChanged]');
    // в orderData помечаем неспользуемые записи
    for (let key in orderData) {
        if (orderData[key]['purchase_content/id'] == orderRowCheckBox.name) {
            orderData[key]['notused'] = !orderRowCheckBox.checked;
        }
    }

    // обновляем сумму оплаты по всем позициям закупки для всех клиентов
    updateClientTotalCost(clientData, orderData, clientTableSelector);
}

// обновляет сумму оплаты по всем позициям закупки для всех клиентов
function updateClientTotalCost(clientData, orderData, clientTableSelector) {
    console.log('[paymentApp.updateClientTotalCost]');
    // перебираем клиентов
    for (var key in clientData) {
        let clientDataRow = clientData[key];
        let clientId = clientDataRow['client/id'];
        
        // получаем сумму оплаты по всем позициям закупки для данного клиента
        var totalCost = getOrderClientTotalCost(clientId, orderData);

        let totalValueSelector = `${clientTableSelector} #client-id-${clientId}`;
        let totalValueElement = document.querySelector(totalValueSelector);
        if (totalValueElement) totalValueElement.innerHTML = totalCost;

    }
}

// получаем сумму оплаты по всем позициям закупки для данного клиента
function getOrderClientTotalCost(clientId, orderData) {
    console.log('[paymentApp.getOrderClientTotalCost]');
    var totalCost = 0;
    for (let key in orderData) {
        let orderDataRow = orderData[key];
        // console.log('orderDataRow:', orderDataRow);
        if (clientId == orderDataRow['client/id']) {
            // console.log('orderTableRow:', orderTableRow);
            if (!orderDataRow['notused']) {
                let subCost = Number(orderDataRow['cost']) - Number(orderDataRow['paid']);
                totalCost += !isNaN(subCost) ? subCost : 0;
            }
        }
    }
    return totalCost;
}

function onSubmitPaymentClicked(e, purchaseId, orderData) {
    console.log('[paymentApp.onSubmitPaymentClicked]');
    busyIndicator.show();
    console.log('payment submited with data:', orderData);
    
    var orderId = [];
    for (let key in orderData) {
        let row = orderData[key];
        console.log('row:', row, 'notused', row['notused']);
        if (!row['notused']) orderId.push(Number(row['purchase_content/id']));
    }
    console.log('orderId:', orderId);

    if (orderId.length > 0) {
        callProcedure({
            procedureName: 'transferOrderPayment',
            params: [
                purchaseId,         // id закупки, для которой проводим оплату
                JSON.stringify(orderId),   // [] массив id позиций в order, подлежащих оплате
            ]
        })
            .then( responseData => {
                if (responseData == 0) {
                    alert('Выполнено успешно');
                }
                busyIndicator.hide();
            }).catch(e => {
                alert('Операция отменена');
                busyIndicator.hide();
            });
    } else {
        alert('Для проведения оплаты не выбрана ни одна позиция');
    }
}
