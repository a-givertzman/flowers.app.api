"use strict";
/**
 * Класс собирает html таблицу из @header @body
 * в элементе с селектором @parentSelector
*/
export class HtmlTable {
    constructor(parentSelector, header, body) {
        console.log('[HtmlTable.constructor]');
        this.parentSelector = parentSelector;
        this.header = header;
        this.body = body;
        this.elem = document.querySelector(this.parentSelector)
    }
    async render(params = {}) {
        console.log('[HtmlTable.render]');
        this.elem.innerHTML = '';
        const thead = this.header.render();
        const tbody = await this.body.render(params);
        this.elem.appendChild(thead);
        this.elem.appendChild(tbody);
        return this.elem;
    }
    clear() {
        if (this.elem) this.elem.innerHTML = '';
    }
}
