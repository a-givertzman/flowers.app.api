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
 * Текстовая кнопка
 *
 * @param {Widget} child елеиент, обычно текст выводимый на кнопке
 */
export class TextButton {
    #debug = false;
    #child;
    #onPressed;
    #style;
    #widget;
    constructor({
        child, 
        onPressed, 
        onLongPress, 
        onHover, 
        onFocusChange, 
        style, 
        focusNode, 
        autofocus = false
    }={}) {
        this.#child = child;
        this.#onPressed = onPressed;
        this.onLongPress = onLongPress;
        this.onHover = onHover;
        this.onFocusChange = onFocusChange;
        this.focusNode = focusNode;
        this.autofocus = autofocus;
        this.#style = style;
        this.#widget = new Widget({
            child: this.#child,
            cssClass: [
                'text-button-widget',
            ],
        });
    }
    build() {
        const element = this.#widget.build().htmlElement;
        element.addEventListener('click', (e) => {
            if (this.#onPressed && typeof this.#onPressed == 'function') {
                this.#onPressed(e);
            }
        });
        element.addEventListener('mouseover', (e) => {
            if (this.onHover && typeof this.onHover == 'function') {
                this.onHover(e);
            }
        });
        return this;
    }
    get htmlElement() {
        return this.#widget.htmlElement;
    }
}
