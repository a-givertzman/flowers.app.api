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
 * Путь к одной конкретной страничке приложения
 *
 * @param {string} path путь к страничке
 * @param {Widget} widget страничка приложения
 */
export class MaterialRoute {
    #debug = true;
    #path;      // внутренний путь к страничке
    #widget;    // страничка приложения
    #htmlElement;
    constructor({
        path,
        widget
    }={}) {
        if (!path) throw SyntaxError('[MaterialRoute] parameter "path" is required');
        // if (!(child instanceof Widget)) throw new TypeError(`[MaterialRoute] parameter "path" is required, type of "string", but recived ${path.constructor.name}`);
        this.#path = path;
        if (!widget) throw SyntaxError('[MaterialRoute] parameter "widget" is required');
        // if (!(child instanceof Widget)) throw new TypeError(`[MaterialRoute] parameter "widget" is required, type of "Widget", but recived ${path.constructor.name}`);
        this.#widget = widget;
    }
    get path() {
        return this.#path;
    }
    hide() {
        this.#widget.htmlElement.hidden = false;
    }
    show() {
        this.#widget.htmlElement.hidden = true;
    }
    build() {
        const widget = this.#widget.build();
        this.#htmlElement = widget.htmlElement;
        return new Promise((resolve, reject) => {
            widget.onComplete(result => {
                log(this.#debug, '[MaterialRoute.build] child result: ', result);
                widget.htmlElement.classList.remove('scaffold-widget-slide-in')
                widget.htmlElement.classList.add('scaffold-widget-slide-out')
                setTimeout(() => {
                    widget.htmlElement.remove();
                }, 200);
                // widget.htmlElement.remove();
                resolve(result);
            });
        });
    }
    get htmlElement() {
        return this.#htmlElement;
    }
}
