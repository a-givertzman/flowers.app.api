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

/**
 * гендерит заголовок закупки
 * @returns html string represents header of table Purchases
 */
export function renderPurchaseHeader() {
    var theadHtml = `
        <thead>
            <tr class="purchase-row-header">
                <th colspan="100">Товары закупки</th>
            </tr>
            <tr class="purchase-row">
                <th><span>Выбор</span></th>
                <th>PrID</th>
                <th>Группа</th>
                <th>Нименование</th>
                <th>Цена закупки</th>
                <th>Цена</th>
                <th><span>Транспортные<br>расходы</span></th>
            </tr>
        </thead>
        `;
    var tbodyHtml = `
        <tbody>
        </tbody>
    `;
    var thead = document.createElement('thead');
    thead.innerHTML = theadHtml.trim();
    var tbody = document.createElement('tbody');
    tbody.innerHTML = tbodyHtml.trim();
    return {thead: thead, tbody: tbody};
}

/**
 * гендерит одну строку из таблицы purchase_member
 * @param {string} row объект с данными для генерации строки таблицы
 * @returns html string represents row of table Purchases
 */
 export function renderPurchaseRow(row) {
    let purchase_content_id = row['purchase_content/id'];
    var rowHtml = `
        <tr class="purchase-row">
            <th><input class="purchase-row-checkbox" type="checkbox" name="${purchase_content_id}" id="chbx${purchase_content_id}" checked></th>
            <td>${row['product/id']}</td>
            <td>${row['product/group']}</td>
            <td>${row['product/name']}</td>
            <td>
                ${row['product/primary_price']}
                ${row['product/primary_currency']}
            </td>
            <td>
                ${row['purchase_content/sale_price']}
                ${row['purchase_content/sale_currency']}
            </td>
            <td>${row['purchase_content/shipping']}</td>
        </tr>
    `;
    var newRow = document.createElement('tr');
    newRow.innerHTML = rowHtml.trim();
    return newRow;
}

/**
 * гендерит заголовок таблицы Участники закупки
 * @returns html string represents header of table Clients
 */
 export function renderClientHeader() {
    var theadHtml = `
        <thead>
            <tr class="transaction-row-header">
                <th colspan="100">Участники заккупки</th>
            </tr>
            <tr class="transaction-row">
                <th>id</th>
                <th>ФИО</th>
                <th>Контакт</th>
                <th>Баланс</th>
                <th><span>Сумма<br>к оплате</span></th>
            </tr>
        </thead>
    `;
    var tbodyHtml = `
        <tbody>
        </tbody>
    `;
    var thead = document.createElement('thead');
    thead.innerHTML = theadHtml.trim();
    var tbody = document.createElement('tbody');
    tbody.innerHTML = tbodyHtml.trim();
    return {thead: thead, tbody: tbody};
}

/**
 * гендерит одну запись для таблицы Участники закупки
 * @param {string} row объект с данными для генерации строки таблицы
 * @returns html string represents row of table Clients
 */
 export function renderClientRow(row) {
    let clientTotal = row['client_total'] 
        ? row['client_total'] + owerpay
        : 0;
    var rowHtml = `
        <tr class="transaction-row">
            <td>${row['client/id']}</td>
            <td>${row['client/name']}</td>
            <td>${row['client/phone']}</td>
            <td>${row['client/account']} RUB</td>
            <td><p id="client-id-${row['client/id']}">${clientTotal}</p> RUB</td>
        </tr>
    `;
    var newRow = document.createElement('tr');
    newRow.innerHTML = rowHtml.trim();
    return newRow;
}