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
import { TextAlign, TextAlignVertical } from "./alignment.js";
import { InputDecoration } from "./input_decoration.js";

/**
 * Виджет для ввода текста
 *
 * @param {Key} key уникальный ключ виджета
 * @param {string} initialValue текст в поле ввода
 * @param {} focusNode фокус
 * @param {} keyboardType вид клавиатуры
 * @param {TextStyle} style стиль текста
 * @param {TextAlign} textAlign выравнивание текста по горизонтали
 * @param {TextAlignVertical} textAlignVertical выравнивание текста по вертикали
 * @param {bool} enabled заблокировано
 * @param {bool} readOnly только чтение
 * @param {string} obscuringCharacter = '•' символ скрытого текста
 * @param {bool} obscureText = false скрыть текст
 * @param {Number} maxLines = 1 
 * @param {bool} expands = false 
 * @param {Number} maxLength 
 * @param {function} onChanged 
 * @param {function} onTap 
 * @param {function} onEditingComplete 
 * @param {function} onFieldSubmitted 
 * @param {function} validator string function(string)
 */
export class TextFormField {
    #debug = true;
    #key;
    #initialValue;
    #focusNode;
    #decoration;
    #keyboardType;
    #style;
    #textAlign;
    #textAlignVertical;
    #enabled;
    #readOnly;
    #obscuringCharacter;
    #obscureText;
    #maxLines;
    #expands;
    #maxLength;
    #onChanged;
    #onTap;
    #onComplete;
    #validator;
    #widget;
    constructor({
        key, 
        initialValue, 
        focusNode, 
        decoration = new InputDecoration(), 
        keyboardType, 
        style, 
        textAlign, 
        textAlignVertical,
        enabled, 
        readOnly, 
        obscuringCharacter, 
        obscureText, 
        maxLines, 
        expands, 
        maxLength, 
        onChanged, 
        onTap,
        onComplete, 
        validator,
    }={}) {
        // log(this.#debug, '[TextFormField] onChanged', onChanged);
        this.#key = key;
        this.#initialValue = initialValue;
        this.#focusNode = focusNode;
        this.#decoration = decoration;
        this.#keyboardType = keyboardType;
        this.#style = style;
        this.#textAlign = textAlign ? textAlign : TextAlign.center;
        this.#textAlignVertical = textAlignVertical ? textAlignVertical : TextAlignVertical.center;
        this.#enabled = enabled ? enabled : true;
        this.#readOnly = readOnly ? readOnly : false;
        this.#obscuringCharacter = obscuringCharacter ? obscuringCharacter : '•';
        this.#obscureText = obscureText ? obscureText : false;
        this.#maxLines = maxLines ? maxLines : 1;
        this.#expands = expands ? expands : false;
        this.#maxLength = maxLength ? maxLength : null;
        this.#onChanged = onChanged;
        this.#onTap = onTap;
        this.#onComplete = onComplete;
        this.#validator = validator;
        this.#widget = new Widget({
            tagName: 'input',
            cssClass: ['text-form-field-widget'],
        });
    }
    build() {
        const element = this.#widget.build().htmlElement;
        element.type = this.#obscureText ? 'password' : 'text';
        element.innerHTML = this.#initialValue;
        element.style.color = this.#style?.color;
        element.style.backgroundColor = this.#style?.backgroundColor ?? 'transparent';
        element.style.fontSize = this.#style ? `${this.#style.fontSize}px` : '';
        element.style.fontFamily = this.#style?.fontFamily;
        element.style.fontWeight = this.#style?.fontWeight;
        element.style.height = this.#style?.height;
        element.style.overflow = this.#style?.overflow;
        element.style.textAlign = this.#textAlign;
        const border = this.#decoration.border.build();
        element.style.borderTop = border ? `${border.top}` : '';
        element.style.borderRight = border ? `${border.right}` : '';
        element.style.borderBottom = border ? `${border.bottom}` : '';
        element.style.borderLeft = border ? `${border.left}` : '';
        element.addEventListener('input', (e) => this.onInputListener(e));
        element.addEventListener('change', (e) => this.completedListener(e));
        return this;
    }
    get htmlElement() {
        return this.#widget.htmlElement;
    }
    onInputListener(e) {
        if (typeof this.#onChanged == 'function') {
            this.#onChanged(e.target.value);
        }
        if (typeof this.#validator == 'function') {
            this.#validator(e.target.value);
        }
    }
    completedListener(e) {
        if (typeof this.#onComplete == 'function') {
            this.#onComplete(e.target.value);
        }
    }
}