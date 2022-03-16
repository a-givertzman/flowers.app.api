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
import { Scaffold } from "../plugins/js-widgets/scaffold.js";
import { ButtonStyle } from "../plugins/js-widgets/button_style.js";
import { TextButton } from "../plugins/js-widgets/text_button.js";
import { ListView } from "../plugins/js-widgets/listview.js";
import { MainAxisAlignment, CrossAxisAlignment, TextAlign, TextAlignVertical } from "../plugins/js-widgets/alignment.js";
import { Row } from "../plugins/js-widgets/row.js";
import { Border } from "../plugins/js-widgets/border.js";
import { TextWidget } from "../plugins/js-widgets/text.js";
import { TextStyle } from "../plugins/js-widgets/text_style.js";
import { Center } from "../plugins/js-widgets/center.js";
import { Container } from "../plugins/js-widgets/container.js";
import { SizedBox } from "../plugins/js-widgets/sizedbox.js";
import { Column } from "../plugins/js-widgets/column.js";
import { log } from "../plugins/debug/debug.js";
import { AppUser } from "../domain/auth/app_user.js";
import { EdgeInsets } from "../plugins/js-widgets/edge_insets.js";
import { Expanded } from "../plugins/js-widgets/expanded.js";
import { MaterialRoute } from "../plugins/js-widgets/material_route.js";
import { ClientGtablePage } from "./client_gtable_page.js";

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
    #widget;
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
        if (!user) throw SyntaxError('[MainMenuPage] parameter "user" is required');
        if (!(user instanceof AppUser)) throw new TypeError(`[MainMenuPage] parameter "user" is required, type of "AppUser", but recived ${user.constructor.name}`);
        this.#user = user;
        this.#widget = new Scaffold({
            title: 'Главное меню',
            child: new Column({
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                    new Expanded({
                        child: new Container({
                            color: '#29497F',
                            height: 64,
                            child: new Row({
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                    new Container({
                                        width: 128,
                                        child: new Center({
                                            child: new TextWidget(
                                                `Flowers<br/>App<br/>Казань`,{
                                                style: menuHeaderTextStyle,
                                            }),
                                            border: Border.all({width: 4, color: '#ff2020'}),
                                        }),
                                    }),
                                    new Center({
                                        child: new TextWidget(
                                            `Главное меню`,{
                                            style: {...menuHeaderTextStyle, ...{fontSize: 16}},
                                        }),
                                        // border: Border.all({width: 4, color: '#ff2020'}),
                                    }),
                                    new Container({
                                        width: 256,
                                        child: new Center({
                                            child: new TextWidget(
                                                `Пользователь:<br/>${this.#user.name}`,{
                                                style: {...menuHeaderTextStyle, ...{textAlign: TextAlign.right}},
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                        }),
                    }),
                    new Row({
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                            new Container({
                                height: 300,
                                child: new ListView({
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: menuLeftColumnItems,
                                    itemBuilder: (index) => {
                                        return new Container ({
                                            width: 180,
                                            child: new TextButton({
                                                child: new TextWidget(
                                                    `${menuLeftColumnItems[index]}`, {
                                                    style: menuButtonsTextStyle,
                                                }),
                                                style: new ButtonStyle({
                                                    backgroundColor: '#FF9B40',
                                                    foregroundColor: '#ffffff',
                                                }),
                                                onPressed: this.menuLeftColumnActions[index],
                                            }),
                                            padding: EdgeInsets.all(4),
                                        });
                                    },
                                }),
                            }),
                            // new SizedBox({width: 10}),
                            new Container({
                                height: 300,
                                child: new ListView({
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: menuRightColumnItems,
                                    itemBuilder: (index) => {
                                        return new Container ({
                                            width: 180,
                                            padding: EdgeInsets.all(4),
                                            child: new TextButton({
                                                child: new TextWidget(`${menuRightColumnItems[index]}`, {
                                                    style: menuButtonsTextStyle,
                                                }),
                                                style: new ButtonStyle({
                                                    backgroundColor: '#FF9B40',
                                                    foregroundColor: '#ffffff',
                                                }),
                                                onPressed: this.menuRightColumnActions[index],
                                            }),
                                        });
                                    },
                                }),
                            }),
                        ],
                    }),
                    new Expanded({
                        child: new Container({
                            color: '#323232',
                            height: 64,
                            child: new Center({
                                child: new TextWidget(`footer`,{
                                    style: menuFooterTextStyle,
                                }),
                            }),
                        }),
                    }),
                ],
            }),
        });
    }
    build() {
        return this.#widget.build();
    }
    get htmlElement() {
        return this.#widget.htmlElement;
    }
    #onClientsPressed(e) {
        // const user = {};
        // new MaterialRoute({
        //     path: '/mainMenu',
        //     widget: new ClientGtablePage({
        //         user: user,
        //     }),
        // })
        // .build()
        // .then((result) => {
        //     log(this.#debug, '[AuthPage.onClientsPressed.build.then] result: ', result);
        // });
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
