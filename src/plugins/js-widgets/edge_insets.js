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
 * Создает отступ со всех сторон для элемента
 */
export class EdgeInsets {
    #top;
    #right;
    #bottom;
    #left;
    /**
     * Создает отступ со всех сторон 
     * @param {Number} value
     */
     constructor({top = 0, right = 0, bottom = 0, left = 0}={}) {
        this.#top = top;
        this.#right = right;
        this.#bottom = bottom;
        this.#left = left;
    }
    /**
     * Создает отступ одинаковый со всех сторон 
     * @param {Number} value
     * @returns {Number} EdgeInsets
     */
    static all(value) {
        return new EdgeInsets({
            top: value, 
            right: value, 
            bottom: value, 
            left: value,
        });
    }
    // get top() {return this.#top;} 
    // get right() {return this.#right;} 
    // get bottom() {return this.#bottom;} 
    // get left() {return this.#left;} 
    build() {
        return {
            top: `${this.#top}px`,
            right: `${this.#right}px`,
            bottom: `${this.#bottom}px`,
            left: `${this.#left}px`,
        };
    }
}