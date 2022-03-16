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

import { CrossAxisAlignment, MainAxisAlignment } from "./alignment.js";
import { MultiWidget } from "./multi_widget.js";
import { Axis } from "./orientation.js";

/**
 * Список виджетов со скролом
 *
 * @param {List<Widget>} children виджет, который будет внутри
 */
export class ListView {
    #debug = false;
    #children;
    #itemBuilder;
    #mainAxisAlignment;
    #crossAxisAlignment;
    #direction;
    #widget;
    constructor({
        children = [], 
        itemBuilder = () => {},
        mainAxisAlignment = MainAxisAlignment.start, 
        crossAxisAlignment = CrossAxisAlignment.center,
        direction = Axis.vertical,
    }={}) {
        this.#children = children;
        this.#itemBuilder = itemBuilder;
        this.#mainAxisAlignment = mainAxisAlignment;
        this.#crossAxisAlignment = crossAxisAlignment;
        this.#direction = direction;
        this.#widget = new MultiWidget({
            tagName: 'ul',
            itemCount: this.#children.length,
            itemBuilder: (index) => {
                return this.#itemBuilder(index);
                // return this.#children[index];
            },
            cssClass: [
                'list-view-widget',
            ],
            mainAxisAlignment: this.#mainAxisAlignment,
            crossAxisAlignment: this.#crossAxisAlignment,
            direction: this.#direction,
        });
    }
    build() {
        log(this.#debug, '[ListView.build] children: ', this.#children);
        this.#widget.build();
        // this.widget.htmlElement.style.justifyContent = this.mainAxisAlignment;
        // this.widget.htmlElement.style.alignItems = this.crossAxisAlignment;
        // for (var index = 0; index < this.children.length; index++) {
        //     let childElement = document.createElement('li');
        //     let childItem = this.itemBuilder(index);
        //     childItem.build();
        //     childElement.appendChild(childItem.element);
        //     this.widget.htmlElement.appendChild(childElement);
        // }
        return this;
    }
    get htmlElement() {
        return this.#widget.htmlElement;
    }
}