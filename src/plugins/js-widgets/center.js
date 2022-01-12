"use strict";
// import { Widget } from "./widget";
/**
 * Центрирует child виджет
 *
 * @param {Widget} child виджет, который будет отцентрирован
 */
class Center {
    constructor({child}={}) {
        this.child = child;
        this.widget = new Widget({
            cssClass: ['center-widget']
        });
    }
    build() {
        this.child.build();
        this.widget.element.appendChild(this.child.element);
        this.widget.build();
    }
    get element() {
        return this.widget.element;
    }
}