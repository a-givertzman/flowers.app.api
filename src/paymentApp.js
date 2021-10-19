"use strict";
// import { clearCookie, getCookie, setCookie } from './cookie';
// import { getView, getData, getJoinData } from './mysql';
// import { renderPurchaseHeader, renderPurchaseRow } from './renderPaymentPurchaseReport';
// import { renderTransactionHeader, renderTransactionRow } from './renderPaymentPurchaseReport';

// import {BusyIndicator} from '@plugins/busy-indicator/busy.js'

// import '@plugins/jquery-form-styler/jquery.formstyler.css';
// import '@plugins/jquery-form-styler/jquery.formstyler.theme.css';
// import './css/style.css';
// import './css/media.css';
// import slider_1_background_img from '@img/slider-background.png';
// import header_logo_img from '@img/header-logo.png';
// import { User } from './user';
// import { cli } from 'webpack';

const domainPath = '';//'../../'; http://u1489690.isp.regruhosting.ru/

var data = null;
var purchaseMemberData = {};
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
        busyIndicator = new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
        
        // загружаем список закупок
        busyIndicator.show();
        getData({
            tableName: 'purchase', 
            keys: ['*'], 
            orderBy: 'id', 
            order: 'ASC', 
            where: [], 
            limit: 0,
        }).then(responseData => {
            data = responseData;
            for(var key in data) {
                let item = data[key];
                $('.search-purchase-select')
                    .append(new Option(item.id + ' | ' + item.name + ' | ' + item.detales + ' | ' + item.status, item.id, false))
                    .trigger('change');
            }
            busyIndicator.hide();
        }).catch(e => {
            busyIndicator.hide();
        });

        // загружаем информацию по выбранной закупке
        $('.search-purchase-select').on('select2:select', e => {
            clearTablesContent(['table.purchase-items', 'table.purchase-clients']);
            
            var selectedId = e.params.data.id;
            
            // закупки клиента
            busyIndicator.show();
            var where = [{operator: 'where', field: 'purchase/id', cond: '=', value: selectedId}];
            getView({
                tableName: 'purchaseMemberView', 
                params: '0', 
                keys: ['*'],
                orderBy: 'purchase/id', 
                order: 'ASC', 
                where: where, 
                limit: 0,
            }).then(responseData => {
                purchaseMemberData = responseData;
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
                                purchaseMemberData,
                                clientData, 
                                'table.purchase-clients',   // селектор таблицы клиентов
                                'table.purchase-items',     // селектор таблицы товаров
                                '.purchase-row-checkbox'
                            );
                        });                
                    }

                    // добавляем в таблицу заголовок спика клиентов
                    var table = document.querySelector('table.purchase-clients');
                    var newClient = renderClientHeader({});
                    table.append(newClient.thead);
                    table.append(newClient.tbody);
                    tableBody = newClient.tbody;

                    // перебираем клиентов
                    for (let key in clientData) {
                        let rowData = clientData[key];
                        let row = renderClientRow(rowData);
                        tableBody.append(row);
                        console.log('clientDataRow:', row);
                    }        
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
    let table;
    selectors.forEach(tableSelector => {
        table = document.querySelector(tableSelector);
        if (table) table.innerHTML = '';
    });
}


function objectRemoveDuplicated(data, keyField) {
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


function onPurchaseListChanged(purchaseMemberRowCheckBox, purchaseMemberData, 
    clientData, clientTableSelector, tableSelector, checkBoxSelector
) {
    // в purchaseMemberData помечаем неспользуемые записи
    for (let key in purchaseMemberData) {
        if (purchaseMemberData[key]['purchase_content/id'] == purchaseMemberRowCheckBox.name) {
            purchaseMemberData[key]['notused'] = !purchaseMemberRowCheckBox.checked;
        }
    }
    console.log('purchaseMemberData:', purchaseMemberData);

    // перебираем клиентов
    for (var key in clientData) {
        let clientDataRow = clientData[key];
        let clientId = clientDataRow['client/id'];
        
        // получаем сумму оплаты по всем позициям закупки для данного клиента
        var totalCost = getPurchaseMemberClientTotalCost(clientId, purchaseMemberData);

        let totalValueSelector = `${clientTableSelector} #client-id-${clientId}`;
        let totalValueElement = document.querySelector(totalValueSelector);
        if (totalValueElement) totalValueElement.innerHTML = totalCost;

    }
}

function getPurchaseMemberClientTotalCost(clientId, purchaseMemberData) {
    var totalCost = 0;
    for (let key in purchaseMemberData) {
        let purchaseMemberDataRow = purchaseMemberData[key];
        // console.log('purchaseMemberDataRow:', purchaseMemberDataRow);
        if (clientId == purchaseMemberDataRow['client/id']) {
            // console.log('purchaseMemberTableRow:', purchaseMemberTableRow);
            if (!purchaseMemberDataRow['notused']) {
                let subCost = Number(purchaseMemberDataRow['cost']) - Number(purchaseMemberDataRow['paid']);
                totalCost += !isNaN(subCost) ? subCost : 0;
            }
        }
    }
    return totalCost;
}