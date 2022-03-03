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
// рендерит заголовок закупки
function renderPurchaseHeader(row) {
    var theadHtml = `
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

// рендерит одну позицию из таблицы purchase_member
function renderPurchaseRow(row) {
    var rowHtml = `
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
    var newRow = document.createElement('tr');
    newRow.innerHTML = rowHtml.trim();
    return newRow;
}

// рендерит заголовок транзакций
function renderTransactionHeader(row) {
    var theadHtml = `
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

// рендерит одну запись из таблицы transaction
function renderTransactionRow(row) {
    let purchaseMemberId = row['purchase_member/id'] ? row['purchase_member/id'] : '';
    let purchaseName = row['purchase/name'] ? row['purchase/name'] : '-';
    let productName = row['product/name'] ? row['product/name'] : '-';
    var rowHtml = `
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
    var newRow = document.createElement('tr');
    newRow.innerHTML = rowHtml.trim();
    return newRow;
}