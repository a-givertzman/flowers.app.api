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
import { CrossAxisAlignment, MainAxisAlignment } from "./alignment.js";
import { Axis } from "./orientation.js";
import { MultiWidget } from "./multi_widget.js";

/**
 * Вертикальный массив виджетов
 *
 * @param {Row<Widget>} children массив виджетов, которые будут внутри
 */
export class Row {
    #debug = false;
    #widget;
    #children;
    #mainAxisAlignment;
    #crossAxisAlignment;
    constructor({
        children = [], 
        mainAxisAlignment = MainAxisAlignment.start,
        crossAxisAlignment = CrossAxisAlignment.center,
    }={}) {
        this.#children = children;
        this.#mainAxisAlignment = mainAxisAlignment;
        this.#crossAxisAlignment = crossAxisAlignment;
        this.#widget = new MultiWidget({
            itemCount: this.#children.length,
            itemBuilder: (index) => {
                return this.#children[index];
            },
            cssClass: [
                'row-widget',
            ],
            mainAxisAlignment: this.#mainAxisAlignment,
            crossAxisAlignment: this.#crossAxisAlignment,
            direction: Axis.horizontal, 
        });
    }
    build() {
        log(this.#debug, '[Row.build] children: ', this.#children);
        this.#widget.build();
        // this.widget.htmlElement.style.justifyContent = this.mainAxisAlignment;
        // this.widget.htmlElement.style.alignItems = this.crossAxisAlignment;
        // for (var index = 0; index < this.#children.length; index++) {
        //     let childElement = this.#children[index].element;
        //     this.#children[index].build();
        //     this.widget.htmlElement.appendChild(childElement);
        // }
        return this;
    }
    get htmlElement() {
        return this.#widget.htmlElement;
    }
}