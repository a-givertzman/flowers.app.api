"use strict";
// import { clearCookie, getCookie, setCookie } from './cookie';
import { getView, getData, getJoinData } from './mysql';
import { renderPurchaseHeader, renderPurchaseRow } from './renderPaymentPurchaseReport';
import { renderTransactionHeader, renderTransactionRow } from './renderPaymentPurchaseReport';

import {BusyIndicator} from '@plugins/busy-indicator/busy.js'

// import '@plugins/jquery-form-styler/jquery.formstyler.css';
// import '@plugins/jquery-form-styler/jquery.formstyler.theme.css';
import './css/style.css';
import './css/media.css';
// import slider_1_background_img from '@img/slider-background.png';
// import header_logo_img from '@img/header-logo.png';
import { User } from './user';
import { cli } from 'webpack';

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

// $(function() {
//     $('.search-purchase-select').select2({
//         placeholder: 'ID / ФИО / номер телефона',
//         width: '100%', // need to override the changed default
//         multiple: false,
//         placeholder: "Найди себя",
//         allowClear: true,
//         matcher: matchCustom
//     });
// });


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
// Date.prototype.toDateInputValue = (function() {
//     var local = new Date(this);
//     local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
//     return local.toJSON().slice(0,10);
// });

//
var isValid = false;
// submitBtn.disabled = true;
let date = new Date();
// dateInput.value = date;
// timeInput.value = `${date.getHours()}:${date.getMinutes()}`;


// click on menu icon
// if (showMenuBtn) {
//     showMenuBtn.addEventListener('click',(event) => {
//         let menu = document.querySelector('.menu ul');
//         let menuStyle = window.getComputedStyle(menu);
//         if (menuStyle.display == 'none') {
//             menu.style.display = 'block'
//         } else {
//             menu.style.display = 'none';
//         }
//     });
// }

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
        // $('.search-purchase-select').on('select2:select', e => {
        //     clearTablesContent(['table.purchase-items', 'table.transaction-items']);
            
        //     var selectedId = e.params.data.id;

        //     // баланс клиента
        //     var clientAccount = data[selectedId].account;
        //     document.querySelector('#client-account').innerHTML = `Баланс: ${clientAccount} RUB`;
            
        //     // закупки клиента
        //     // busyIndicator.show();
        //     // var where = [{operator: 'where', field: 'purchase/id', cond: '=', value: selectedId}];
        //     // getView({
        //     //     tableName: 'purchaseMemberView', 
        //     //     params: '0', 
        //     //     keys: ['*'],
        //     //     orderBy: 'purchase/id', 
        //     //     order: 'ASC', 
        //     //     where: where, 
        //     //     limit: 0,
        //     // }).then(responseData => {
        //     //     purchaseMemberData = responseData;
        //     //     // console.log('responseData:', responseData);
        //     //     var table = document.querySelector('table.purchase-items');
        //     //     var tableBody;

        //     //     // выбираем закупки
        //     //     purchaseData = objectRemoveDuplicated(responseData, 'product/id');
        //     //     // выбираем клиентов
        //     //     clientData = objectRemoveDuplicated(responseData, 'client/id');
        //     //     console.log('purchaseData:', purchaseData);
        //     //     // if (Object.keys(purchaseData).length > 0) {
        //     //     //     // добавляем в таблицу заголовок
        //     //     //     var newPurchase = renderPurchaseHeader({});
        //     //     //     table.append(newPurchase.thead);
        //     //     //     table.append(newPurchase.tbody);
        //     //     //     tableBody = newPurchase.tbody;

        //     //     //     // for (var key in purchaseData) {
        //     //     //     //     var rowData = purchaseData[key];
        //     //     //     //     var row = renderPurchaseRow(rowData);
        //     //     //     //     tableBody.append(row);
        //     //     //     //     row.querySelector(`#chbx${rowData['id']}`)?.addEventListener('change', (e) => {
        //     //     //     //         // onPurchaseListChanged(
        //     //     //     //         //     purchaseMemberData,
        //     //     //     //         //     clientData, purchaseData, 
        //     //     //     //         //     'table.purchase-items', '.purchase-row-checkbox'
        //     //     //     //         // );
        //     //     //     //     });                
        //     //     //     // }
        //     //     // }

        //     // }).catch(e => {
        //     //     busyIndicator.hide();
        //     // });
        // });
        
        // $('.search-purchase-select').on('select2:unselect', e => {
        //     clearTablesContent(['table.purchase-items', 'table.transaction-items']);
        // });

        // USER.name = getCookie('name');
        // USER.email = getCookie('email');
        // USER.group = getCookie('group');
        // console.log('[window.onLoad] userName:', userName);
        // ID_TOKEN = USER.email ? getCookie(USER.email) : null;
        // console.log('[window.onLoad] idToken:', idToken);
        // console.log('[window.onLoad] slider-1: ', document.querySelector('.slider-1'));
        // console.log('[window.onLoad] slider-1 image: ', header_logo_img);
        // let img = document.createElement('img');
        // img.src = slider_1_background_img;
        // document.querySelector('.slider-1').appendChild(img);
        // document.querySelector('.header__logo_image').src = header_logo_img;
        // document.querySelector('.slider-1').style.backgroundImage = slider_1_background_img;
        // setFormState(USER);
});


// function clearTablesContent(selectors) {
//     let table;
//     selectors.forEach(tableSelector => {
//         table = document.querySelector(tableSelector);
//         table.innerHTML = '';
//     });
// }


// function objectRemoveDuplicated(data, keyField) {
//     const resultData = {};
//     const keySet = new Set();
//     for (var key in data) {
//         const row = data[key];
//         if (!keySet.has(Number(row[keyField]))) {
//             resultData[key] = row;
//         }
//         keySet.add(Number(row[keyField]));
//     }
//     return resultData;
// }

// function onPurchaseListChanged(purchaseMemberData, 
//     clientData, purchaseData, tableSelector, checkBoxSelector
// ) {
//     var purchaseTable = document.querySelector(tableSelector)?.querySelectorAll(checkBoxSelector);
//     // перебираем клиентов
//     for (var key in clientData) {
//         let clientDataRow = clientData[key];
//         let clientId = clientDataRow['client/id'];
        
//         var totalCost = 0;
//         // перебираем товары закупки
//         for (var key in purchaseMemberData) {
//             let purchaseMemberDataRow = purchaseMemberData[key];
//             console.log('purchaseMemberDataRow:', purchaseMemberDataRow);
//             if (clientId == purchaseMemberDataRow['client/id']) {
//                 purchaseMemberTableRow = purchaseTable.field(row => (row['name'] == purchaseMemberDataRow['id']));
//                 console.log('purchaseMemberTableRow:', purchaseMemberTableRow);
//                 if (purchaseMemberTableRow.checked) {
//                     totalCost += purchaseMemberDataRow['cost'];
//                 }
//             }
//         }
//         console.log('totalCost: ', totalCost);
//     }
    // const tablePurchase = document.querySelector(tableSelector);
    // console.log('tablePurchase:', tablePurchase);
    // const tablePurchaseRows = tablePurchase.querySelectorAll(checkBoxSelector);
    // console.log('tablePurchaseRows:', tablePurchaseRows);
    // tablePurchaseRows.forEach(tableRow => {
    //     console.log('tableRow:', tableRow);
    //     console.log('tableRow id:', tableRow.name);
    // });
// }