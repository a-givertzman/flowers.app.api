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

import { EdgeInsets } from "./edge_insets.js";

/**
 * Виджет добавляет padding (внутренние отступы)
 * @param {Widget} child дочерний элемент, которому добавляет отступы
 */
export class Padding {
    #child;
    #padding;
    constructor({
        child, 
        padding = EdgeInsets.all(0.0),
    }={}) {
        if (!child) throw SyntaxError('[Padding] parameter "child" is required');
        // if (!(child instanceof DataSet)) throw new TypeError(`[Padding] parameter "child" is required, type of "Widget", but recived ${child.constructor.name}`);
        this.#child = child;
        this.#padding = padding;
    }
    build() {
        const element = this.#child.build().htmlElement;
        if (!element) {
            throw new Error(`[Padding] error building child "${this.#child.constructor.name}"`);
        }
        const insets = this.#padding.build();
        element.style.padding = insets 
            ? `${insets.top} ${insets.right} ${insets.bottom} ${insets.left}` 
            : '';
        return this;
    }
    get htmlElement() {
        if (!this.#child) {
            throw new Error(`[Padding] error access child`);
        }
        return this.#child.htmlElement;
    }
}
