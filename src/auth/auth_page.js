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

import { log } from "../plugins/debug/debug.js";
import { MaterialRoute } from "../plugins/js-widgets/material_route.js";
import { Scaffold } from "../plugins/js-widgets/scaffold.js";
import { ButtonStyle } from "../plugins/js-widgets/button_style.js";
import { TextButton } from "../plugins/js-widgets/text_button.js";
import { MainAxisAlignment, CrossAxisAlignment, TextAlign, TextAlignVertical } from "../plugins/js-widgets/alignment.js";
import { Row } from "../plugins/js-widgets/row.js";
import { TextFormField } from "../plugins/js-widgets/text_form_field.js";
import { TextWidget } from "../plugins/js-widgets/text.js";
import { Center } from "../plugins/js-widgets/center.js";
import { Container } from "../plugins/js-widgets/container.js";
import { SizedBox } from "../plugins/js-widgets/sizedbox.js";
import { Padding } from "../plugins/js-widgets/padding.js";
import { Expanded } from "../plugins/js-widgets/expanded.js";
import { Column } from "../plugins/js-widgets/column.js";
import { EdgeInsets } from "../plugins/js-widgets/edge_insets.js";
import { appThemeData } from "../core/app_themedata.js";
import { Authenticate } from "../domain/auth/authenticate.js";
import { AppUser } from "../domain/auth/app_user.js";
import { MainMenuPage } from "../main_menu/main_menu_page.js";

export class AuthPage {
    #debug = false;
    #widget;
    #user;
    #auth;
    #userPhone = '';
    #userPass = '';
    constructor({user}={}) {
        if (!user) throw SyntaxError('[AuthPage] parameter "user" is required');
        if (!(user instanceof AppUser)) throw new TypeError(`[AuthPage] parameter "user" is required, type of "AppUser", but recived ${user.constructor.name}`);
        this.#user = user;
        this.#auth = new Authenticate({
            user: user,
        });
        this.#widget = new Scaffold({
            title: '??????????????????????!',
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
                                                `Flowers<br/>App<br/>????????????`,{
                                                style: {
                                                    ...appThemeData.textTheme.bodyText1,
                                                    ...{color: '#ffffff'}
                                                },
                                            }),
                                        }),
                                    }),
                                    new Center({
                                        child: new TextWidget(
                                            `??????????????????????`,{
                                            style: {
                                                ...appThemeData.textTheme.subtitle1, 
                                                ...{fontSize: 16, color: '#ffffff'}
                                            },
                                        }),
                                    }),
                                    new Container({
                                        width: 256,
                                        child: new Center({
                                            child: new TextWidget(
                                                ``,{
                                                style: {
                                                    ...appThemeData.textTheme.subtitle1, 
                                                    ...{textAlign: TextAlign.right, color: '#ffffff'}
                                                },
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                        }),
                    }),
                    new Container({
                        width: 200,
                        child: new Column({
                            // mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                                new TextWidget('?????????? ????????????????:', {
                                    style: {
                                        ...appThemeData.textTheme.headline6, 
                                        ...{color: '#000000'}
                                    }
                                }),
                                new TextFormField({
                                    style: {
                                        ...appThemeData.textTheme.headline6, 
                                        ...{color: '#000000'}
                                    },
                                    onChanged: (value) => {
                                        this.#onLoginChanged(value);
                                    },
                                    onComplete: (value) => {
                                        this.#onLoginCompletted(value);
                                    },
                                }),
                                new SizedBox({height: 24}),
                                new TextWidget('????????????:', {
                                    style: {
                                        ...appThemeData.textTheme.headline6, 
                                        ...{color: '#000000'}
                                    },
                                }),
                                new TextFormField({
                                    obscureText: true,
                                    style: {
                                        ...appThemeData.textTheme.headline6, 
                                        ...{color: '#000000'}
                                    },
                                    onChanged: (e) => {
                                        this.#onPassChanged(e);
                                    },
                                    onComplete: (e) => {
                                        this.#onPassCompletted(e);
                                    },
                                }),
                                new SizedBox({height: 24}),
                                new TextButton({
                                    child: new TextWidget(
                                        '????????', {
                                        style: {
                                            ...appThemeData.textTheme.headline6, 
                                            ...{color: '#000000'}
                                        },
                                    }),
                                    style: new ButtonStyle({
                                        backgroundColor: '#FF9B40',
                                        foregroundColor: '#ffffff',
                                    }),
                                    onPressed: (e) => {
                                        console.log('TextButton signIn cliced');
                                        this.#onSignInPressed(e);
                                    },
                                }),
                            ],
                        }),
                    }),
                    new Expanded({
                        child: new Container({
                            color: '#323232',
                            height: 64,
                            child: new Center({
                                child: new TextWidget(`footer`,{
                                    style: {
                                        ...appThemeData.textTheme.subtitle1, 
                                        ...{color: '#ffffff'}
                                    },
                                }),
                            }),
                        }),
                    }),
                ],
            }),
        });
    }
    build() {
        this.#auth.authenticateIfStored()
            .then((authResult) => {
                if (authResult.authenticated) {
                    this.#routeTo(authResult.user)
                }
            });
        const widgetBuild = this.#widget.build();
        return widgetBuild;
    }
    get htmlElement() {
        return this.#widget.htmlElement;
    }
    #routeTo(user) {
        new MaterialRoute({
            path: '/mainMenu',
            widget: new MainMenuPage({
                user: user,
            }),
        })
        .build()
        .then((result) => {
            log(this.#debug, '[AuthPage.build.then] result: ', result);
        });
    }
    #onLoginChanged(value) {
    }
    #onLoginCompletted(value) {
        this.#userPhone = value;
    }
    #onPassChanged(value) {
    }
    #onPassCompletted(value) {
        this.#userPass = value;
    }
    #onSignInPressed(e) {
        console.log('TextButton cliced: ', e);
        console.log('?????????? ????????????????: ', this.#userPhone);
        console.log('????????????: ', this.#userPass);
        this.#auth.authenticateByPhoneNumber(this.#userPhone, this.#userPass)
            .then((authResult) => {
                if (authResult.authenticated && (this.#auth.getUser().group == 'admin' || this.#auth.getUser().group == 'manager')) {
                    this.#routeTo(authResult.user);
                } else {
                    alert(authResult.message);
                }
            });
    }
}
