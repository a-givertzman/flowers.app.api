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

import { MainAxisAlignment, CrossAxisAlignment } from "./alignment.js";
import { Axis } from "./orientation.js";

/**
 * Базовый классс 
 * Создает елемент в дерве DOM
 * @param {string} tag имя тега, которое будет создано, по умолчанию 'div'
 */
export class MultiWidget {
    #debug = false;
    #itemCount;
    #itemBuilder;
    #tagName;
    #cssClass;
    #htmlElement;
    #mainAxisAlignment;
    #crossAxisAlignment;
    #direction;
    constructor({
        itemCount, 
        itemBuilder, 
        tagName = 'div', 
        cssClass = [],
        mainAxisAlignment = MainAxisAlignment.start,
        crossAxisAlignment = CrossAxisAlignment.center,
        direction = Axis.vertical,
    }={}) {
        this.#itemCount = itemCount;
        this.#itemBuilder = itemBuilder;
        this.#tagName = tagName;
        this.#cssClass = cssClass;
        this.#mainAxisAlignment = mainAxisAlignment;
        this.#crossAxisAlignment = crossAxisAlignment;
        this.#direction = direction;
    }
    build() {
        this.#htmlElement = document.createElement(this.#tagName);
        if (!this.#htmlElement) {
            throw new Error(`[Widget] error creating document element "${this.#tagName}"`);
        }
        this.#htmlElement.style.flexDirection = this.#direction;
        this.#htmlElement.style.justifyContent = this.#mainAxisAlignment;
        this.#htmlElement.style.alignItems = this.#crossAxisAlignment;
        // TODO remove margin to the Margin class
        // this.#htmlElement.style.margin = this.margin ? `${this.margin}px` : '';
        // TODO remove border to the Border class
        // this.#htmlElement.style.border = this.border ? this.border.build() : '';
        if (this.#cssClass.length > 0) {
            this.#htmlElement.classList.add([...this.#cssClass]);
        }
        if (this.#itemBuilder) {
            for(var index = 0; index < this.#itemCount; index++) {
                const item = this.#itemBuilder(index);
                log(this.#debug, '[MultyWidget] index: ', index, ' item: ', item);
                const childWidget = item.build();
                this.#htmlElement.appendChild(
                    childWidget.htmlElement
                );
            }
        }
        return this;
    }
    get htmlElement() {
        if (!this.#htmlElement) {
            throw new Error(`[MultyWidget] error access htmlElement befor it was created`);
        }
        return this.#htmlElement;
    }
}
