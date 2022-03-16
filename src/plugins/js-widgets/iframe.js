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
 * Базовый классс 
 * Создает елемент в дерве DOM
 * @param {string} tag имя тега, которое будет создано, по умолчанию 'div'
 */
export class IFrame {
    #debug = true;
    #src;
    #cssClass;
    #htmlElement;
    #name;
    constructor({
        src = '',
        cssClass = ['iframe-widget'],
    }={}) {
        this.#src = src;
        this.#cssClass = cssClass;
        this.#name = 'iframe_12345';
    }
    build() {
        this.#htmlElement = document.createElement('iframe');
        if (!this.#htmlElement) {
            throw new Error(`[IFrame.build] error creating document element "iframe"`);
        }
        // TODO remove margin to the Margin class
        // this.#htmlElement.style.margin = this.margin ? `${this.margin}px` : '';
        // TODO remove border to the Border class
        // this.#htmlElement.style.border = this.border ? this.border.build() : '';
        if (this.#cssClass.length > 0) {
            this.#htmlElement.classList.add(...this.#cssClass);
        }
        // log(this.#debug, '[Widget.build] child', this.#child);
        if (this.#src) {
            // throw new Error(`[Widget.build] error accessing child widget "${this.constructor.name}"`);
            this.#htmlElement.src = this.#src;
            this.#htmlElement.name = this.#name;
        }
        // ifrm = (this.#htmlElement.contentWindow) 
        //     ? this.#htmlElement.contentWindow 
        //     : (this.#htmlElement.contentDocument.document) 
        //         ? this.#htmlElement.contentDocument.document 
        //         : this.#htmlElement.contentDocument;
        setTimeout(() => {
            log(this.#debug, '[IFrame.build] contentWindow: ', this.#htmlElement.contentWindow);
            log(this.#debug, '[IFrame.build] contentDocument: ', this.#htmlElement.contentDocument);
            this.#htmlElement.contentDocument.addEventListener('click', (e) => {
                e.preventDefault();
                log(this.#debug, '[IFrame.build] contentDocument event: ', e);
                //doStuffHere
                e.target.setAttribute('target', this.#name);
                this.#htmlElement.contentWindow.location = e.target.href;
            });
        }, 1000);
        // log(this.#debug, '[Widget.build] this: ', this);
        // log(this.#debug, '[Widget.build] child: ', this.#child);
        log(this.#debug, '[IFrame.build] child: ', this.htmlElement);
        return this;
        // try {
        // } catch (error) {
        //     log(this.#debug, '[Widget.build] error: ', error);
        //     throw new Error(`[Widget.build] error call method child.build()"; `, error);
        // }
    }
    get htmlElement() {
        if (!this.#htmlElement) {
            throw new Error(`[Widget] error access htmlElement befor it was created`);
        }
        return this.#htmlElement;
    }
}
