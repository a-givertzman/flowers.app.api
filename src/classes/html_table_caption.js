"use strict";
/**
 * Класс собирает строку с названием html таблицы из @text
 * и добавляет в него список классов в строке @classString
*/
export class HtmlTableCaption {
    constructor(text, classString) {
        console.log('[HtmlTableCaption.constructor]');
        this.text = text;
        this.classString = classString;
    }
    render(text) {
        console.log('[HtmlTableCaption.render]');
        text = text ? text : this.text;
        const html = `
                <th colspan="100">${text}</th>
        `;
        const elem = document.createElement('tr');
        elem.classList.add(this.classString);
        elem.innerHTML = html.trim();
        return elem;
    }
}