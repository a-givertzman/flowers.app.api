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
import { FontWeight } from "./font_weight.js";

/**
 * Текстовый виджет
 *
 * @param {string} data текст выводимый виджетом в DOM
 */
export class TextWidget {
    #data;
    #style;
    #overflow;
    #widget;
    constructor(data, {
        style
    }={}) {
        this.#data = data;
        this.#style = style;
        this.#overflow = TextOverflow.ellipsis;
        this.#widget = new Widget({
            // tagName: 'p',
            cssClass: ['text-widget']
        });
    }
    build() {
        const element = this.#widget.build().htmlElement;
        element.innerHTML = this.#data;
        element.style.color = this.#style?.color;
        element.style.backgroundColor = this.#style?.backgroundColor;
        element.style.fontSize = this.#style ? `${this.#style.fontSize}px` : 'inherit';
        element.style.fontFamily = this.#style?.fontFamily ?? 'inherit';
        element.style.fontWeight = this.#style?.fontWeight ?? 'inherit';
        element.style.height = this.#style?.height;
        element.style.overflow = this.#overflow ? 'hidden' : '';
        element.style.textOverflow = this.#overflow;
        element.style.textAlign = this.#style?.textAlign;
        // this.#ellipsizeTextBox(element);
        // new ResizeObserver(async () => {
        //     this.#onResize();
        // }).observe(element);
        return this;
    }
    get htmlElement() {
        return this.#widget.htmlElement;
    }
    #onResize() {
        const element = this.#widget.htmlElement;
        this.#addText(element, this.#data);
    }
    #addText(element, text) {
        element.innerHTML = '';
        const wordArray = text.split(' ');
        const height = element.clientHeight;
        for(var i = 0; i < wordArray.length; i++) {
            element.innerHTML = element.innerHTML + " " + wordArray[i];
            if (checkOverflow(element)) {
                return 0;
            }
        }
    }
    #ellipsizeTextBox(element) {
        const wordArray = element.innerHTML.split(' ');
        while(element.scrollHeight > element.clientHeight) {
            wordArray.pop();
            element.innerHTML = wordArray.join(' ') + '...';
         }
    }
}
function checkOverflow(el) {
   const curOverflow = el.style.overflow;
   if ( !curOverflow || curOverflow === "visible" )
      el.style.overflow = "hidden";
   const isOverflowing = el.clientWidth < el.scrollWidth 
      || el.clientHeight < el.scrollHeight;
   el.style.overflow = curOverflow;
   return isOverflowing;
}
export const TextOverflow = {
    clip: 'clip',
    fade: 'fade',
    ellipsis: 'ellipsis',
    // visible: '',
}