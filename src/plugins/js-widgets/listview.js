"use strict";
/**
 * Список виджетов со скролом
 *
 * @param {List<Widget>} children виджет, который будет внутри
 */
class ListView {
    constructor({children = [], itemBuilder: itemBuilder}={}) {
        this.children = children;
        this.itemBuilder = itemBuilder;
        this.widget = new Widget({
            tagName: 'ul',
            cssClass: [
                'list-view-widget',
            ]
        });
    }
    build() {
        this.widget.build();
        for (var index = 0; index < this.children.length; index++) {
            let childElement = document.createElement('li');
            let childItem = this.itemBuilder(index);
            childItem.build();
            childElement.appendChild(childItem.element);
            this.widget.element.appendChild(childElement);
        }
    }
    get element() {
        return this.widget.element;
    }
}