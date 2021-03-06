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
// import { getCookie, setCookie, clearCookie } from 'cookie.js';
// import { getView, getData, getJoinData } from 'mysql.js';
// import { renderPurchaseHeader, renderPurchaseRow } from 'renderClientReport.js';
// import { renderTransactionHeader, renderTransactionRow } from 'renderClientReport.js';
// import '@plugins/slick-slider/slick.css';

// import { BusyIndicator } from './plugins/busy-indicator/busy.js';

// import '@plugins/jquery-form-styler/jquery.formstyler.css';
// import '@plugins/jquery-form-styler/jquery.formstyler.theme.css';
// import './css/style.css';
// import './css/media.css';
// import slider_1_background_img from '@img/slider-background.png';
// import header_logo_img from '@img/header-logo.png';
// import { User } from './user';

const domainPath = '';//'../../'; http://u1489690.isp.regruhosting.ru/

var data = null;
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

$(function() {
    $('.search-purchase-select').select2({
        placeholder: "?????????? ????????",
        width: '100%', // need to override the changed default
        multiple: false,
        allowClear: true,
        matcher: matchCustom,
        sorter: function(results) {
            var query = $('.select2-search__field').val().toLowerCase();
            return results.sort(function(a, b) {
              return a.text.toLowerCase().indexOf(query) -
                b.text.toLowerCase().indexOf(query);
            });
        }
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
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

//
var isValid = false;
// submitBtn.disabled = true;
let date = new Date();
// dateInput.value = date;
// timeInput.value = `${date.getHours()}:${date.getMinutes()}`;


// click on menu icon
if (showMenuBtn) {
    showMenuBtn.addEventListener('click',(event) => {
        let menu = document.querySelector('.menu ul');
        let menuStyle = window.getComputedStyle(menu);
        if (menuStyle.display == 'none') {
            menu.style.display = 'block'
        } else {
            menu.style.display = 'none';
        }
    });
}

window.addEventListener(                                            // ON LOAD WINDOW
    'load', (event) => {
        busyIndicator = new BusyIndicator('.busy-indicator', 'busy-indicator-hide')
        // ?????????????????? ???????????? ????????????????
        busyIndicator.show();
        var where = [{operator: 'where', field: 'deleted', cond: 'is null', value: null},];
        getData({
            tableName: 'client', 
            keys: ['*'], 
            orderBy: 'id', 
            order: 'ASC', 
            where: where, 
            limit: 0,
            url: domainPath + 'get_data.php',
        }).then(responseData => {
            data = responseData;
            for(var key in data) {
                let item = data[key];
                $('.search-purchase-select')
                    .append(new Option(item.id + ' | ' + item.name, item.id, false))
                    .trigger('change');
            }
            busyIndicator.hide();
        }).catch(e => {
            busyIndicator.hide();
        });

        // ?????????????????? ???????????????????? ???? ???????????????????? ??????????????
        $('.search-purchase-select').on('select2:select', e => {
            console.log('selection id:', e.params.data);
            clearTablesContent(['table.purchase-items', 'table.transaction-items']);
            
            var selectedId = e.params.data.id;

            // ???????????? ??????????????
            var clientAccount = data[selectedId].account;
            document.querySelector('#client-account').innerHTML = `????????????: ${clientAccount} RUB`;
            
            // ?????????????? ??????????????
            busyIndicator.show();
            var where = [
                {operator: 'where', field: 'client/id', cond: '=', value: selectedId},
                {operator: 'and', field: 'deleted', cond: 'is null', value: null},
            ];
            getView({
                tableName: 'purchaseMemberView', 
                params: '0', 
                keys: ['*'],
                orderBy: 'purchase/id', 
                order: 'ASC', 
                where: where, 
                limit: 0,
            }).then(responseData => {

                // console.log('responseData:', responseData);
                var table = document.querySelector('table.purchase-items');
                console.log('table: ', table);
                var tableBody;
                var purchase_id = -1;
                for (var key in responseData) {
                    var rowData = responseData[key];
                    
                    // ???????? ?????????????????? id ??????????????
                    // ???? ?????????????????? ?? ?????????????? ?????????????????? ???????? ??????????????
                    if (purchase_id != rowData['purchase/id']) {
                        purchase_id = rowData['purchase/id'];
                        // console.log('next purchase:', rowData);
                        var newPurchase = renderPurchaseHeader(rowData);
                        table.append(newPurchase.thead);
                        table.append(newPurchase.tbody);
                        tableBody = newPurchase.tbody;
                    }
                    // console.log('rowData:', rowData);
                    var row = renderPurchaseRow(rowData);
                    // console.log('row:', row);
                    tableBody.append(row);
                };

            }).catch(e => {
                busyIndicator.hide();
            });
            // ???????????????????? ??????????????
            busyIndicator.show();
            var where = [
                {operator: 'where', field: 'client/id', cond: '=', value: selectedId},
                {operator: 'and', field: 'deleted', cond: 'is null', value: null},
            ];
            getView({
                tableName: 'clientTransactionView', 
                params: '0', 
                keys: ['*'],
                orderBy: 'date', 
                order: 'ASC', 
                where: where, 
                limit: 0,
            }).then(responseData => {

                console.log('responseData:', responseData);

                var table = document.querySelector('table.transaction-items');
                var tableBody;

                var client_id = -1;
                for (var key in responseData) {
                    var rowData = responseData[key];

                    // ???????? ?????????????????? id ??????????????
                    // ???? ?????????????????? ?? ?????????????? ?????????????????? ???????? ??????????????
                    if (client_id != rowData['client/id']) {
                        client_id = rowData['client/id'];
                        // console.log('next purchase:', rowData);
                        var newTransaction = renderTransactionHeader(rowData);
                        table.append(newTransaction.thead);
                        table.append(newTransaction.tbody);
                        tableBody = newTransaction.tbody;
                    }

                    // console.log('rowData:', rowData);
                    var row = renderTransactionRow(rowData);
                    // console.log('row:', row);
                    tableBody.append(row);
                };

                busyIndicator.hide();
            }).catch(e => {
                busyIndicator.hide();
            });
        });
        
        $('.search-purchase-select').on('select2:unselect', e => {
            clearTablesContent(['table.purchase-items', 'table.transaction-items']);
        });

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

function clearTablesContent(selectors) {
    let table;
    selectors.forEach(tableSelector => {
        table = document.querySelector(tableSelector);
        table.innerHTML = '';
    });
}