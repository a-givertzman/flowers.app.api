"use strict";
// рендерит заголовок закупки
function renderPurchaseHeader(row) {
    var theadHtml = `
        <thead>
            <tr class="purchase-row-header">
                <th colspan="100">Закупка [${row['purchase/id']}] ${row['purchase/name']}</th>
            </tr>
            <tr class="purchase-row">
                <th><span>Выбор</span></th>
                <th>PrID</th>
                <th>Группа</th>
                <th>Нименование</th>
                <th><span>Заказал</span></th>
                <th><span>Получил</span></th>
                <th>Цена закупки</th>
                <th>Цена</th>
                <th><span>Транспортные расходы</span></th>
                <th><span>Стоимость</span></th>
                <th><span>Оплатил</span></th>
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
            <th><input class="purchase-row-checkbox" type="checkbox" name="${row['id']}" id="chbx${row['id']}" checked></th>
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
        </tr>
    `;
    var newRow = document.createElement('tr');
    newRow.innerHTML = rowHtml.trim();
    return newRow;
}

// рендерит заголовок транзакций
function renderClientHeader(row) {
    var theadHtml = `
        <thead>
            <tr class="transaction-row-header">
                <th colspan="100">Участники заккупки [${row['client/id']}] ${row['client/name']}</th>
            </tr>
            <tr class="transaction-row">
                <th>id</th>
                <th>ФИО</th>
                <th>Контакт</th>
                <th>Баланс</th>
                <th><span>Сумма заказа</span></th>
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
function renderClientRow(row) {
    let clientTotal = row['client_total'] ? row['client_total'] : 0;
    var rowHtml = `
        <tr class="transaction-row">
            <td>${row['client/id']}</td>
            <td>${row['client/name']}</td>
            <td>${row['client/phone']}</td>
            <td>${row['client/account']} RUB</td>
            <td>${clientTotal} RUB</td>
        </tr>
    `;
    var newRow = document.createElement('tr');
    newRow.innerHTML = rowHtml.trim();
    return newRow;
}