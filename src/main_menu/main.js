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
import { MainMenu } from "../main_menu/main_menu.js";
import { App } from "../plugins/js-widgets/app.js";
import { ButtonStyle } from "../plugins/js-widgets/button_style.js";
import { TextButton } from "../plugins/js-widgets/text_button.js";
import { ListView } from "../plugins/js-widgets/listview.js";
import { MainAxisAlignment, CrossAxisAlignment, TextAlign, TextAlignVertical } from "../plugins/js-widgets/alignment.js";
import { Row } from "../plugins/js-widgets/row.js";
import { Border } from "../plugins/js-widgets/border.js";
import { Text } from "../plugins/js-widgets/text.js";
import { TextStyle } from "../plugins/js-widgets/text_style.js";
import { Center } from "../plugins/js-widgets/center.js";
import { Container } from "../plugins/js-widgets/container.js";
import { SizedBox } from "../plugins/js-widgets/sizedbox.js";
import { Column } from "../plugins/js-widgets/column.js";

const appFontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
const menuHeaderTextStyle = new TextStyle({
    fontFamily: appFontFamily,
    fontSize: 12,
    color: '#ffffff',
});
const menuFooterTextStyle = new TextStyle({
    fontFamily: appFontFamily,
    fontSize: 12,
    color: '#ffffff',
});
const menuButtonsTextStyle = new TextStyle({
    fontFamily: appFontFamily,
    fontSize: 14
});
const menuLeftColumnItems = [
    'Клиенты', 'Продукты', 'Закупки', 'Состав закупок', 'Заказы', 'Транзакции',
];
const menuRightColumnItems = [
    'Отчет по закупке', 'Отчет по клиенту', 'Перевод оплаты', 'Новая транзакция', 'Уведомления по закупкам'
];
const menuLeftColumnActions = [
    onClientsPressed,           // Клиенты
    onProductsPressed,          // Продукты
    onPurchasesPressed,         // Закупки
    onPurchaseContentPressed,   // Состав закупок
    onOrdersPressed,            // Заказы
    onTransactionsPressed,      // Транзакции
];
const menuRightColumnActions = [
    onPurchaseReportPressed,    // Отчет по закупке
    onClientReportPressed,      // Отчет по клиенту
    onPaymentPressed,           // Перевод оплаты по закупкам
    onNewTransactionPressed,    // Новая транзакция
    onPurchaseNoticePressed,    // Уведомления/Сообщения по закупкам
];

window.addEventListener('load', (event) => {                       // ON LOAD WINDOW
    var app = new App({
        child: new Container({
            child: new MainMenu({
                user: {},
                child: new Center({
                    child: new Column({
                        children: [
                            new Container({
                                child: new Row({
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                        new Container({
                                            child: new Center({
                                                child: new Text(
                                                    `Flowers<br/>App<br/>Казань`,{
                                                    style: menuHeaderTextStyle,
                                                }),
                                                border: Border.all({width: 4, color: '#ff2020'}),
                                            }),
                                            width: 128,
                                            height: 64,
                                            // padding: 4,
                                            // margin: 8,
                                        }),
                                        new Container({
                                            child: new Center({
                                                child: new Text(
                                                    `Главное меню`,{
                                                    style: {...menuHeaderTextStyle, ...{fontSize: 16}},
                                                }),
                                                // border: Border.all({width: 4, color: '#ff2020'}),
                                            }),
                                            color: 'transparent',
                                            width: Number.POSITIVE_INFINITY,
                                            // height: 16,
                                            // padding: 4,
                                            // margin: 8,
                                        }),
                                        new Container({
                                            child: new Center({
                                                child: new Text(
                                                    `Пользователь:<br/>Антон Лобанов`,{
                                                    style: {...menuHeaderTextStyle, ...{textAlign: TextAlign.right}},
                                                }),
                                            }),
                                            width: 256,
                                            height: 64,
                                        }),
                                    ],
                                }),
                                color: '#29497F',
                                // width: Number.POSITIVE_INFINITY,
                                height: 64,
                            }),
                            new SizedBox({height: Number.POSITIVE_INFINITY}),
                            new Row({
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                    // new SizedBox({width: Number.POSITIVE_INFINITY}),
                                    new ListView({
                                        mainAxisAlignment: MainAxisAlignment.start,
                                        crossAxisAlignment: CrossAxisAlignment.end,
                                        children: menuLeftColumnItems,
                                        itemBuilder: (index) => {
                                            return new Container ({
                                                child: new TextButton({
                                                    child: new Text(
                                                        `${menuLeftColumnItems[index]}`, {
                                                        style: menuButtonsTextStyle,
                                                    }),
                                                    style: new ButtonStyle({
                                                        backgroundColor: '#FF9B40',
                                                        foregroundColor: '#ffffff',
                                                    }),
                                                    onPressed: menuLeftColumnActions[index],
                                                }),
                                                width: 180,
                                                padding: 4,
                                            });
                                        },
                                    }),
                                    // new SizedBox({width: 10}),
                                    new ListView({
                                        mainAxisAlignment: MainAxisAlignment.start,
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: menuRightColumnItems,
                                        itemBuilder: (index) => {
                                            return new Container ({
                                                child: new TextButton({
                                                    child: new Text(`${menuRightColumnItems[index]}`, {
                                                        style: menuButtonsTextStyle,
                                                    }),
                                                    style: new ButtonStyle({
                                                        backgroundColor: '#FF9B40',
                                                        foregroundColor: '#ffffff',
                                                    }),
                                                    onPressed: menuRightColumnActions[index],
                                                }),
                                                width: 180,
                                                padding: 4,
                                            });
                                        },
                                    }),
                                    // new SizedBox({width: Number.POSITIVE_INFINITY}),
                                ],
                            }),
                            new SizedBox({height: Number.POSITIVE_INFINITY, width: Number.POSITIVE_INFINITY}),
                            new Container({
                                    child: new Center({
                                        child: new Text(`footer`,{
                                            style: menuFooterTextStyle,
                                        }),
                                    }),
                                color: '#323232',
                                width: Number.POSITIVE_INFINITY,
                                height: 128,
                                padding: 4,
                                // margin: 8,
                            }),
                        ],
                    }),
                }),
            }),
            color: '#29497F',
            // height: Number.POSITIVE_INFINITY,
        }),
    });
    app.run();
});

function onClientsPressed(e) {
    console.log('event onClientsPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/1upSq5wiEWr2uxuuTFrT3umHOFTDILxHtpOXqDPXP7cU/edit?usp=sharing');
}
function onProductsPressed(e) {
    console.log('event onProductsPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/1KLYTlaEv3Ujfp5GT0zZoDBJuLGucCqnMZ9EBDBGrxHs/edit?usp=sharing');
}
function onPurchasesPressed(e) {
    console.log('event onPurchasesPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/1TeSwNyv76Rbhug5ouEUmWMs8ij0nGklIBY3uTK1L83M/edit?usp=sharing');
}
function onOrdersPressed(e) {
    console.log('event onOrdersPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/1goc22OHI7d7UfFlWU8DqtgY0c4-D30qBiJlVamcaZWM/edit?usp=sharing');
}
function onPurchaseContentPressed(e) {
    console.log('event onPurchaseContentPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/12dfDYDNL7ch2PBxppSjnb6aurovn-pydtdCn2uxwmwg/edit?usp=sharing');
}
function onTransactionsPressed(e) {
    console.log('event onTransactionsPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/11MkKtzftMKyr7ARtCwxn9LSSEMQcqUlwznfun086VTo/edit?usp=sharing');
}
function onPurchaseReportPressed(e) {
    console.log('event onPurchaseReportPressed: ', e);
    window.open('https://u1489690.isp.regruhosting.ru/admin-purchase-report');
}
function onClientReportPressed(e) {
    console.log('event onClientReportPressed: ', e);
    window.open('https://u1489690.isp.regruhosting.ru/admin-client-report');
}
function onPaymentPressed(e) {
    console.log('event onPaymentPressed: ', e);
    window.open('https://u1489690.isp.regruhosting.ru/payment');
}
function onNewTransactionPressed(e) {
    console.log('event onNewTransactionPressed: ', e);
    alert('Добавление транзакций в разработке');
    // window.open('');
}
function onPurchaseNoticePressed(e) {
    console.log('event onPurchaseNoticePressed: ', e);
    alert('Уведомления по закупкам в разработке');
    // window.open('');
}
