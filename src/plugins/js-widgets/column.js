"use strict";
/**
 * Вертикальный массив виджетов
 *
 * @param {Column<Widget>} children массив виджетов, которые будут внутри
 */
class Column {
    constructor({children = [], mainAxisAlignment = 'start', crossAxisAlignment = 'center'}={}) {
        this.children = children;
        this.mainAxisAlignment = mainAxisAlignment;
        this.crossAxisAlignment = crossAxisAlignment;
        this.widget = new Widget({
            cssClass: [
                'column-widget',
            ]
        });
    }
    build() {
        this.widget.build();
        this.widget.element.style.justifyContent = this.mainAxisAlignment;
        this.widget.element.style.alignItems = this.crossAxisAlignment;
        for (var index = 0; index < this.children.length; index++) {
            let childElement = this.children[index].element;
            this.children[index].build();
            this.widget.element.appendChild(childElement);
        }
    }
    get element() {
        return this.widget.element;
    }
}