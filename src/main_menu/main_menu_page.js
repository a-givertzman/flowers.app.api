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
import { log } from "../core/debug.js";
import { AppUser } from "../domain/auth/app_user.js";

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

export class MainMenuPage {
    #debug = true;
    #app;
    #user;
    menuLeftColumnActions = [
        this.#onClientsPressed,           // Клиенты
        this.#onProductsPressed,          // Продукты
        this.#onPurchasesPressed,         // Закупки
        this.#onPurchaseContentPressed,   // Состав закупок
        this.#onOrdersPressed,            // Заказы
        this.#onTransactionsPressed,      // Транзакции
    ];
    menuRightColumnActions = [
        this.#onPurchaseReportPressed,    // Отчет по закупке
        this.#onClientReportPressed,      // Отчет по клиенту
        this.#onPaymentPressed,           // Перевод оплаты по закупкам
        this.#onNewTransactionPressed,    // Новая транзакция
        this.#onPurchaseNoticePressed,    // Уведомления/Сообщения по закупкам
    ];
    constructor({user}={}) {
        if (!user) throw SyntaxError('[Authenticate] parameter "user" is required');
        if (!(user instanceof AppUser)) throw new TypeError(`[Authenticate] parameter "user" is required, type of "AppUser", but recived ${user.constructor.name}`);
        this.#user = user;
        this.#app = new App({
            title: 'Главное меню',
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
                                                        `Пользователь:<br/>${this.#user.name}`,{
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
                                                        onPressed: this.menuLeftColumnActions[index],
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
                                                        onPressed: this.menuRightColumnActions[index],
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
    }
    build() {
        this.#app.run();
    }
    #onClientsPressed(e) {
        // log(this.#debug, 'event onClientsPressed: ', e);
        window.open('https://docs.google.com/spreadsheets/d/1upSq5wiEWr2uxuuTFrT3umHOFTDILxHtpOXqDPXP7cU/edit?usp=sharing');
    }
    #onProductsPressed(e) {
        // log(this.#debug, 'event onProductsPressed: ', e);
        window.open('https://docs.google.com/spreadsheets/d/1KLYTlaEv3Ujfp5GT0zZoDBJuLGucCqnMZ9EBDBGrxHs/edit?usp=sharing');
    }
    #onPurchasesPressed(e) {
        // log(this.#debug, 'event onPurchasesPressed: ', e);
        window.open('https://docs.google.com/spreadsheets/d/1TeSwNyv76Rbhug5ouEUmWMs8ij0nGklIBY3uTK1L83M/edit?usp=sharing');
    }
    #onOrdersPressed(e) {
        // log(this.#debug, 'event onOrdersPressed: ', e);
        window.open('https://docs.google.com/spreadsheets/d/1goc22OHI7d7UfFlWU8DqtgY0c4-D30qBiJlVamcaZWM/edit?usp=sharing');
    }
    #onPurchaseContentPressed(e) {
        // log(this.#debug, 'event onPurchaseContentPressed: ', e);
        window.open('https://docs.google.com/spreadsheets/d/12dfDYDNL7ch2PBxppSjnb6aurovn-pydtdCn2uxwmwg/edit?usp=sharing');
    }
    #onTransactionsPressed(e) {
        // log(this.#debug, 'event onTransactionsPressed: ', e);
        window.open('https://docs.google.com/spreadsheets/d/11MkKtzftMKyr7ARtCwxn9LSSEMQcqUlwznfun086VTo/edit?usp=sharing');
    }
    #onPurchaseReportPressed(e) {
        // log(this.#debug, 'event onPurchaseReportPressed: ', e);
        window.open('https://u1489690.isp.regruhosting.ru/admin-purchase-report');
    }
    #onClientReportPressed(e) {
        // log(this.#debug, 'event onClientReportPressed: ', e);
        window.open('https://u1489690.isp.regruhosting.ru/admin-client-report');
    }
    #onPaymentPressed(e) {
        // log(this.#debug, 'event onPaymentPressed: ', e);
        window.open('https://u1489690.isp.regruhosting.ru/payment');
    }
    #onNewTransactionPressed(e) {
        // log(this.#debug, 'event onNewTransactionPressed: ', e);
        alert('Добавление транзакций в разработке');
        // window.open('');
    }
    #onPurchaseNoticePressed(e) {
        // log(this.#debug, 'event onPurchaseNoticePressed: ', e);
        alert('Уведомления по закупкам в разработке');
        // window.open('');
    }
}
