"use strict";
// import { Widget } from "./widget";
/**
 * Текстовый виджет
 *
 * @param {string} text текст выводимый виджетом в DOM
 */
class Text {
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