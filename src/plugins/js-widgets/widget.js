"use strict";
/**
 * Создает елемент в дерве DOM
 *
 * @param {string} tag имя тега, которое будет создано, по умолчанию 'div'
 */
export class Widget {
    constructor({tagName: tagName = 'div', cssClass = []}={}) {
        this.tagName = tagName;
        this.cssClass = cssClass;
        this._element = document.createElement(this.tagName);
    }
    build() {
        if (this.cssClass.length > 0) {
            this._element.classList.add([...this.cssClass]);
        }
    }
    get element() {
        return this._element;
    }
}
