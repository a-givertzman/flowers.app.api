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
 * Реализует переключение между страничками приложения
 *
 * @param {string} title заголовок приложения
 * @param {Widget} home корневой виджет приложения
 */
export class Navigator {
    #debug = true;
    #routes = [];
    #initialRoute;
    constructor({
        initialRoute,
        routes,
    }={}) {
        if (!routes) throw SyntaxError('[Navigator] parameter "routes" is required');
        if (!(routes instanceof Array)) throw new TypeError(`[Navigator] parameter "routes" is required, type of "Array<MaterialRoute>", but recived ${child.constructor.name}`);
        this.#routes = routes;
        this.#initialRoute = initialRoute;
    }
    pop() {
        if (this.#routes.length > 0) {
            this.#lastRoute().remove();
            this.#routes.pop();
        }
    }
    push(route) {
        if (this.#routes.length > 0) {
            this.#lastRoute().hide();
        }
        this.#routes.push(route);
        document.body.appendChild(route.build().htmlElement);
        route.show();
    }
    #lastRoute() {
        return this.#routes[this.#routes.length - 1];
    }
    build() {
        // const lastRoute = this.#lastRoute().build();
        const lastRoute = this.#routes[0].build();
        const lastRouteElement = lastRoute.htmlElement;
        console.log('[Navigator.build] lastRoute: ', lastRoute);
        // log(this.#debug, '[Navigator.build] lastRoute: ', lastRoute);
        log(this.#debug, '[Navigator.build] lastRouteElement: ', lastRouteElement);
        document.body.appendChild(lastRouteElement);
        return this;
    }
    get htmlElement() {
        return this.#lastRoute().htmlElement;
    }
}
