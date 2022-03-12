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

/**
 * Растянет child на все доступное пространство
 * @param {Widget} child дочерний элемент
 */
export class Expanded {
    #child;
    flex;
    constructor({
        child, 
        flex: flex = 1,
    }={}) {
        if (!child) throw SyntaxError('[Expanded] parameter "child" is required');
        // if (!(child instanceof DataSet)) throw new TypeError(`[Expanded] parameter "child" is required, type of "Widget", but recived ${child.constructor.name}`);
        this.#child = child;
        this.flex = flex;
    }
    build() {
        const element = this.#child.build().htmlElement;
        if (!element) {
            throw new Error(`[Expanded] error building child "${this.#child.constructor.name}"`);
        }
        element.style.flexGrow = this.flex;
        element.style.width = '100%';
        element.style.height = '100%';
        return this;
    }
    get htmlElement() {
        if (!this.#child) {
            throw new Error(`[Expanded] error access child`);
        }
        return this.#child.htmlElement;
    }
}
