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
// import { Widget } from "./widget";
/**
 * Текстовый виджет
 *
 * @param {string} text текст выводимый виджетом в DOM
 */
export class Text {
    constructor(data, {style}={}) {
        this.data = data;
        this.style = style;
        this.widget = new Widget({
            cssClass: ['text-widget']
        });
    }
    build() {
        this.widget.element.innerHTML = this.data;
        this.widget.element.style.color = this.style?.color;
        this.widget.element.style.backgroundColor = this.style?.backgroundColor;
        this.widget.element.style.fontSize = this.style ? `${this.style.fontSize}px` : '';
        this.widget.element.style.fontFamily = this.style?.fontFamily;
        this.widget.element.style.fontWeight = this.style?.fontWeight;
        this.widget.element.style.height = this.style?.height;
        this.widget.element.style.overflow = this.style?.overflow;
        this.widget.element.style.textAlign = this.style?.textAlign;
    }
    get element() {
        return this.widget.element;
    }
}