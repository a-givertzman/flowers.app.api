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
 * Виджет имеющий размеры, цвет фона отступы внешние и внутренние, контур
 * А также вложенный виджет
 * @param {Widget} child вложенный виджет
 * @param {Number} width ширина виджета
 * @param {Number} height высота виджета
 * @param {Color} color цвет фона виджета, по умолчанию прозрачный
 * @param {Number} margin внешние отступы
 * @param {Number} padding внутренние отступы
 * @param {Border} border контур
 */
export class Container {
    constructor({child, width, height, color, margin, padding, border}={}) {
        this.child = child;
        this.width = width;
        this.height = height;
        this.color = color;
        this.margin = margin;
        this.padding = padding;
        this.border = border;
        this.widget = new Widget({
            cssClass: [
                'container-widget',
            ]
        });
    }
    build() {
        this.child.build();
        this.widget.element.appendChild(this.child.element);
        this.widget.build();
        let el = this.element;
        el.style.padding = this.padding ? `${this.padding}px` : '';
        el.style.margin = this.margin ? `${this.margin}px` : '';
        el.style.width = this.width ? `${this.width}px` : '';
        el.style.height = this.height ? `${this.height}px` : '';
        el.style.border = this.border ? this.border.build() : '';
        el.style.backgroundColor = this.color ? this.color : 'transparent';
    }
    get element() {
        return this.widget.element;
    }
}