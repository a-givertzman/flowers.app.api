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
import { Widget } from "../../plugins/js-widgets/widget.js";
/**
 * Список виджетов со скролом
 *
 * @param {List<Widget>} children виджет, который будет внутри
 */
export class ListView {
    constructor({children = [], itemBuilder: itemBuilder, mainAxisAlignment = 'flex-start', crossAxisAlignment = 'center'}={}) {
        this.children = children;
        this.itemBuilder = itemBuilder;
        this.mainAxisAlignment = mainAxisAlignment;
        this.crossAxisAlignment = crossAxisAlignment;
        this.widget = new Widget({
            tagName: 'ul',
            cssClass: [
                'list-view-widget',
            ]
        });
    }
    build() {
        this.widget.build();
        this.widget.element.style.justifyContent = this.mainAxisAlignment;
        this.widget.element.style.alignItems = this.crossAxisAlignment;
        for (var index = 0; index < this.children.length; index++) {
            let childElement = document.createElement('li');
            let childItem = this.itemBuilder(index);
            childItem.build();
            childElement.appendChild(childItem.element);
            this.widget.element.appendChild(childElement);
        }
    }
    get element() {
        return this.widget.element;
    }
}