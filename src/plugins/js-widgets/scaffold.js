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
import { log } from "../../core/debug.js";

 /**
 * Создает объект приложение
 *
 * @param {Widget} child корневой виджет приложения
 */
export class Scaffold {
    #debug = true;
    #title;
    #child;
    #widget;
    #onCompleteCallback;
    onComplete(callback) {
        this.#onCompleteCallback = callback;
    }
    /**
     * Закрывает текущий виджет
     * Передает  
     */
    close(result) {
        log(this.#debug, '[Scaffold.close] result: ', result);
        this.#onCompleteCallback(result);
    }
    constructor({
        title,
        child: child,
    }={}) {
        if (!child) throw SyntaxError('[Scaffold] parameter "child" is required');
        // if (!(child instanceof Widget)) throw new TypeError(`[Scaffold] parameter "child" is required, type of "Widget", but recived ${child.constructor.name}`);
        this.#child = child;
        this.#title = title
        this.#widget = new Widget({
            child: this.#child,
            cssClass: [
                'scaffold-widget',
                'scaffold-widget-slide-in',
            ]
        });
    }
    build() {
        const element = this.#widget.build().htmlElement;
        if (!element) {
            throw new Error(`[Scaffold] error building child "${this.#widget.constructor.name}"`);
        }
        document.body.appendChild(element);
        log(this.#debug, '[Scaffold.build] this: ', this);
        log(this.#debug, '[Scaffold.build] element: ', element);
        return this;
    }
    get htmlElement() {
        return this.#widget.htmlElement;
    }
}
