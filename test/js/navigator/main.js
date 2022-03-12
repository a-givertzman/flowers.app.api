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
import { log } from "../../../src/core/debug.js";
import { MaterialApp } from "../../../src/plugins/js-widgets/material_app.js";
import { HomePage } from "./presentation/home_page.js";

/**
 * Создает объект приложение
 */
class App {
    #debug = true;
    #materialApp;
    constructor({

    }={}) {
        this.#materialApp = new MaterialApp({
            title: 'Test Navigator',
            initialRoute: '/',
            home: new HomePage({
                onNavigate: route => {
                    route.build()
                        .then((result) => {
                            log(this.#debug, '[App.HomePage.onNavigate] result: ', result);
                        });
                },
            }),
            routes: [
                // new MaterialRoute({
                //     path: '/columnPage',
                //     widget: new ColumnPage({
                //         onComplete: (result) => {
                //             log(this.#debug, '[App.ColumnPage.onComplete] result: ', result);
                //         },
                //     }),
                // }),
                // new MaterialRoute({
                //     path: '/rowPage',
                //     widget: new RowPage({
                //         onComplete: (result) => {
                //             log(this.#debug, '[App.RowPage.onComplete] result: ', result);
                //         },
                //     }),
                // }),
            ],
        });
    }
    run() {
        this.#materialApp.run();
    }
}
const app = new App({});

app.run();
