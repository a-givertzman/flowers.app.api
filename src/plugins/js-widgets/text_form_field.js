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
import { TextAlign, TextAlignVertical } from "../../plugins/js-widgets/alignment.js";
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
    constructor({
        key, initialValue, focusNode, keyboardType, style, textAlign, textAlignVertical,
        enabled, readOnly, obscuringCharacter, obscureText, 
        maxLines, expands, maxLength, onChanged, onTap,
        onEditingComplete, validator,
    }={}) {
        this.key = key;
        this.initialValue = initialValue;
        this.focusNode = focusNode;
        this.keyboardType = keyboardType;
        this.style = style;
        this.textAlign = textAlign ? textAlign : TextAlign.center;
        this.textAlignVertical = textAlignVertical ? textAlignVertical : TextAlignVertical.center;
        this.enabled = enabled ? enabled : true;
        this.readOnly = readOnly ? readOnly : false;
        this.obscuringCharacter = obscuringCharacter ? obscuringCharacter : '•';
        this.obscureText = obscureText ? obscureText : false;
        this.maxLines = maxLines ? maxLines : 1;
        this.expands = expands ? expands : false;
        this.maxLength = maxLength ? maxLength : null;
        this.onValueChanged = onChanged;
        this.onTap = onTap;
        this.onEditingComplete = onEditingComplete;
        this.validator = validator;
        this.widget = new Widget({
            tagName: 'input',
            cssClass: ['text-form-field-widget'],
        });
    }
    build() {
        this.widget.element.type = 'text';
        this.widget.element.innerHTML = this.initialValue;
        this.widget.element.style.color = this.style?.color;
        this.widget.element.style.backgroundColor = this.style?.backgroundColor;
        this.widget.element.style.fontSize = this.style ? `${this.style.fontSize}px` : '';
        this.widget.element.style.fontFamily = this.style?.fontFamily;
        this.widget.element.style.fontWeight = this.style?.fontWeight;
        this.widget.element.style.height = this.style?.height;
        this.widget.element.style.overflow = this.style?.overflow;
        this.widget.element.style.textAlign = this.textAlign;
        this.widget.element.addEventListener('input', this.inputListener);
        this.widget.element.addEventListener('change', this.onEditingComplete);
        this.widget.build();
    }
    get element() {
        return this.widget.element;
    }
    inputListener(e) {
        this.onValueChanged(e.target.value);
        if (typeof this.onValueChanged == 'function') {
        }
        this.validator(e.target.value);
        if (typeof this.validator == 'function') {
        }
    }
}