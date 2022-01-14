"use strict";
/**
 * Список виджетов со скролом
 *
 * @param {List<Widget>} children виджет, который будет внутри
 */
class ListView {
    constructor({children = [], itemBuilder: itemBuilder, mainAxisAlignment = 'flex-start', crossAxisAlignment = 'center'}={}) {
        this.children = children;
        this.itemBuilder = itemBuilder;
        this.mainAxisAlignment = mainAxisAlignment;
        this.crossAxisAlignment = crossAxisAlignment;
        this.widget = new Widget({
            tagName: 'ul',
            cssClass: [
                'list-view-widget',
            ]
        });
    }
    build() {
        this.widget.build();
        this.widget.element.style.justifyContent = this.mainAxisAlignment;
        this.widget.element.style.alignItems = this.crossAxisAlignment;
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