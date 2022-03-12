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
import { menuHeaderTextStyle } from "./app_styles.js";
import { SizedBox } from "../../../../src/plugins/js-widgets/sizedbox.js";
import { Center } from "../../../../src/plugins/js-widgets/center.js";
import { Container } from "../../../../src/plugins/js-widgets/container.js";
import { Row } from "../../../../src/plugins/js-widgets/row.js";
import { Column } from "../../../../src/plugins/js-widgets/column.js";
import { Scaffold } from "../../../../src/plugins/js-widgets/scaffold.js";
import { TextOverflow, TextWidget } from "../../../../src/plugins/js-widgets/text.js";
import { CrossAxisAlignment, MainAxisAlignment } from "../../../../src/plugins/js-widgets/alignment.js";
import { TextButton } from "../../../../src/plugins/js-widgets/text_button.js";
import { MaterialRoute } from "../../../../src/plugins/js-widgets/material_route.js";
import { log } from "../../../../src/core/debug.js";
import { FirstPage } from "./first_page.js";
import { SecondPage } from "./second_page.js";
import { ThirdPage } from "./third_page.js";
import { Expanded } from "../../../../src/plugins/js-widgets/expanded.js";

export class HomePage {
    #widget;
    navigateTo;
    constructor({
        onNavigate,
    }={}) {
        this.navigateTo = onNavigate;
        this.#widget = new Scaffold({
            title: 'Home Page',
            child: new Column({
                children: [
                    new Expanded({
                        child: new Container({
                            color: '#5050ff',
                            height: 60,
                            child: new Row({
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                    new TextWidget('', {
                                        style: {...menuHeaderTextStyle, ...{fontSize: 16}},
                                    }),
                                    new TextWidget('Home Page', {
                                        style: {...menuHeaderTextStyle, ...{fontSize: 16}},
                                    }),
                                    new TextWidget('icon', {
                                        style: {...menuHeaderTextStyle, ...{fontSize: 16}},
                                    }),
                                ],
                            }),
                        }),
                    }),
                    new Expanded({
                        child: new Container({
                            color: '#aaaaaa',
                            child: new Center({
                                child: new Container({
                                    // width: Number.MAX_VALUE,
                                    // height: Number.MAX_VALUE,
                                    child: new Column({
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        children: [
                                            new TextButton({
                                                child: new TextWidget('First Page', {
                                                    style: {...menuHeaderTextStyle, ...{fontSize: 16}},
                                                }),
                                                onPressed: (e) => {
                                                    this.navigateTo(
                                                        new MaterialRoute({
                                                            path: '/firstPage',
                                                            widget: new FirstPage({}),
                                                        }),
                                                    );
                                                },
                                            }),
                                            new SizedBox({height: 10}),
                                            new TextButton({
                                                child: new TextWidget('Second page', {
                                                    style: {...menuHeaderTextStyle, ...{fontSize: 16}},
                                                }),
                                                onPressed: (e) => {
                                                    this.navigateTo(
                                                        new MaterialRoute({
                                                            path: '/secondPage',
                                                            widget: new SecondPage({}),
                                                        }),
                                                    );
                                                },
                                            }),
                                            new SizedBox({height: 10}),
                                            new TextButton({
                                                child: new TextWidget('Third Page', {
                                                    style: {...menuHeaderTextStyle, ...{fontSize: 16}},
                                                }),
                                                onPressed: (e) => {
                                                    this.navigateTo(
                                                        new MaterialRoute({
                                                            path: '/thirdPage',
                                                            widget: new ThirdPage({}),
                                                        }),
                                                    );
                                                },
                                            }),
                                        ],
                                    }),
                                }),
                            }),
                        }),
                    })
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
}