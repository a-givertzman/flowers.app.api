"use strict";
/**
 * Класс собирает заголовок html таблицы из @caption
 * и добавляет его перед содержимым в @html
*/
export class HtmlTableHeader {
    constructor(html, caption) {
        console.log('[HtmlTableHeader.constructor]');
        this.html = html;
        this.caption = caption;
    }
    render(caption) {
        console.log('[HtmlTableHeader.render]');
        caption = caption ? caption : this.caption;
        const elem = document.createElement('thead');
        elem.innerHTML = this.html;
        elem.insertBefore(
            this.caption.render(),
            elem.firstChild
        );
        return elem;
    }
}