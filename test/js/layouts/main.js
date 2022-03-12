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
// import { AppUser } from "./domain/auth/app_user.js";
// import { dataSource } from "./infrastructure/datasource/app_data_source.js";
import { MaterialApp } from "../../../src/plugins/js-widgets/material_app.js";
// import { AuthPage } from "./auth/auth_page.js";
import { Center } from "../../../src/plugins/js-widgets/center.js";
import { Container } from "../../../src/plugins/js-widgets/container.js";
import { Row } from "../../../src/plugins/js-widgets/row.js";
import { Column } from "../../../src/plugins/js-widgets/column.js";
import { Scaffold } from "../../../src/plugins/js-widgets/scaffold.js";
import { TextOverflow, TextWidget } from "../../../src/plugins/js-widgets/text.js";
import { CrossAxisAlignment, MainAxisAlignment } from "../../../src/plugins/js-widgets/alignment.js";
import { Expanded } from "../../../src/plugins/js-widgets/expanded.js";

/**
 * Создает объект приложение
 */
const app1 = new MaterialApp({
    title: 'Тест',
    home: new Scaffold({
        title: 'Test',
        child: new Row({
            children: [
                new Column({
                    children: [
                        new Expanded({
                            child: new Container({
                                color: '#aa5050',
                                child: new Center({
                                    child: new Container({
                                        color: '#f2f2f2',
                                        width: 200,
                                        height: 200,
                                        child: new TextWidget(
                                            'Квадрат 1 jhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlh', {
                                            overflow: TextOverflow.clip,
                                        }),
                                    }),
                                }),
                            }),
                        }),
                        new Expanded({
                            child: new Container({
                                color: '#50aa50',
                                child: new Column({
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    crossAxisAlignment: CrossAxisAlignment.center,
                                    children: [
                                        new TextWidget('Квадрат 2.1'),
                                        new TextWidget('Квадрат 2.2'),
                                        new TextWidget('Квадрат 2.3'),
                                    ],
                                }),
                            }),
                        }),
                    ]
                }),
                new Column({
                    children: [
                        new Expanded({
                            child: new Container({
                                color: '#5050aa',
                                child: new Column({
                                    children: [
                                        new Container({
                                            color: '#7070aa',
                                            height: 150,
                                            width: 300,
                                            child: new TextWidget('Квадрат 3.1'),
                                        }),
                                        new Container({
                                            color: '#2020aa',
                                            child: new TextWidget(
                                                'Квадрат 3.2 jhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlhjhgkuygkughkuh kiugk ugk uig kiu g kigkiugkiughkig kikigul iugliugl iug lihlh', {
                                                overflow: TextOverflow.fade,
                                            }),
                                        }),                                    
                                    ],
                                }),
                            }),
                        }),
                        new Expanded({
                            child: new Container({
                                color: '#aa50aa',
                                child: new Center({
                                    child: new TextWidget('Квадрат 4'),
                                }),
                            }),
                        }),
                    ],
                })
            ],
        }),
    }),
});

app1.run();