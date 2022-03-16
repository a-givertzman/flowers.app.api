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
export class BusyIndicator {
    constructor(selector, hiddenClassName) {
        this.selector = selector;
        this.hiddenClassName = hiddenClassName;
        this.busyIndicator = document.createElement('div');
        this.busyIndicator.innerHTML = this.html();
        let className = (selector.charAt(0) == '.') ? selector.slice(1) : selector;
        this.busyIndicator.classList.add(className);
        this.busyIndicator.classList.add(hiddenClassName);
        if (this.busyIndicator instanceof HTMLElement)
            document.body.appendChild(this.busyIndicator);
    }
    show() {
        this.busyIndicator.classList.remove(this.hiddenClassName);
    }
    hide() {
        this.busyIndicator.classList.add(this.hiddenClassName);
    }
    toggle() {
        this.busyIndicator.classList.toggle(this.hiddenClassName)
    }
    html() {
        return `
                <div class="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
        `;
    }
}