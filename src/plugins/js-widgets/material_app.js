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

import { Widget } from "./widget.js";

/**
 * Создает объект приложение
 *
 * @param {string} title заголовок приложения
 * @param {Widget} home корневой виджет приложения
 */
export class MaterialApp {
    #debug = true;
    #title;
    #home;
    #routes;
    #initialRoute;
    #theme;
    #darkTheme;
    #builder;
    #widget;
    constructor({
        title,
        home,
        routes,
        initialRoute,
        theme,
        darkTheme,
        builder,
    }={}) {
        this.#title = title
        this.#home = home;
        this.#routes = routes;
        this.#initialRoute = initialRoute;
        this.#theme = theme;
        this.#darkTheme = darkTheme;
        this.#builder = builder;
        this.#widget = new Widget({
            child: this.#home,
            tagName: 'div',
            cssClass: ['material-app-widget'],
        });
        document.title = this.#title;
    }
    run() {
        window.addEventListener('load', (event) => { 
            this.build();
        });
    }        
    build() {
        log(this.#debug, '[MaterialApp.build] home: ', this.#home);
        this.#home.build();
        // this.#widget.build();
        // if (!(this.#home instanceof Navigator)) {
        //     this.#widget.build();
        //     log(this.#debug, '[MaterialApp.build] App with Navigator: ', this);
        // } else {
        //     document.body.appendChild(this.#widget.build().htmlElement);
        //     log(this.#debug, '[MaterialApp.build] App without Navigator: ', this);
        // }
        log(this.#debug, '[MaterialApp.build] this: ', this);
        log(this.#debug, '[MaterialApp.build] this.widget: ', this.#widget);
        // log(this.#debug, '[MaterialApp.build] this.element: ', this.htmlElement);
        return this;
    }
    get htmlElement() {
        return this.#widget.htmlElement;
    }
}
