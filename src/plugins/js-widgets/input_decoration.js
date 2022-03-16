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

import { Border } from "./border.js";

/**
 * 
 */
export class InputDecoration {
    #errorBorder;
    #focusedBorder;
    #focusedErrorBorder;
    #disabledBorder;
    #enabledBorder;
    #border;
    #enabled;
    constructor({
        errorBorder = Border.all({}),                // Border
        focusedBorder = Border.all({}), 
        focusedErrorBorder = Border.all({}), 
        disabledBorder = Border.all({}), 
        enabledBorder = Border.all({}), 
        border = Border.all({color: '#333333'}), 
        enabled = true,
    }={}) {
        this.#errorBorder = errorBorder;
        this.#focusedBorder = focusedBorder;
        this.#focusedErrorBorder = focusedErrorBorder;
        this.#disabledBorder = disabledBorder;
        this.#enabledBorder = enabledBorder;
        this.#border = border;
        this.#enabled = enabled;
    }
    get border() {
        return this.#border;
    }
}
