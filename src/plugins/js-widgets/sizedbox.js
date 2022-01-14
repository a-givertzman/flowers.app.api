"use strict";
/**
 * Помещает виджет внутрь себя
 *
 * @param {Widget} child виджет, который будет внутри
 */
class SizedBox {
    constructor({child, width, height}={}) {
        this.child = child;
        this.width = width;
        this.height = height;
        this.widget = new Widget({
            cssClass: [
                'sized-box-widget',
            ]
        });
    }
    build() {
        if (this.child) {
            this.child.build();
            this.widget.element.appendChild(this.child.element);
        }
        this.widget.build();
        let el = this.element;
        el.style.width = this.width ? `${this.width}px` : '';
        el.style.height = this.height ? `${this.height}px` : '';
        // el.style.backgroundColor = 'transparent';
    }
    get element() {
        return this.widget.element;
    }
}