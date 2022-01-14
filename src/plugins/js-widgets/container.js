"use strict";
/**
 * Виджет имеющий размеры, цвет фона отступы внешние и внутренние, контур
 * А также вложенный виджет
 * @param {Widget} child вложенный виджет
 * @param {Number} width ширина виджета
 * @param {Number} height высота виджета
 * @param {Color} color цвет фона виджета, по умолчанию прозрачный
 * @param {Number} margin внешние отступы
 * @param {Number} padding внутренние отступы
 * @param {Border} border контур
 */
class Container {
    constructor({child, width, height, color, margin, padding, border}={}) {
        this.child = child;
        this.width = width;
        this.height = height;
        this.color = color;
        this.margin = margin;
        this.padding = padding;
        this.border = border;
        this.widget = new Widget({
            cssClass: [
                'container-widget',
            ]
        });
    }
    build() {
        this.child.build();
        this.widget.element.appendChild(this.child.element);
        this.widget.build();
        let el = this.element;
        el.style.padding = this.padding ? `${this.padding}px` : '';
        el.style.margin = this.margin ? `${this.margin}px` : '';
        el.style.width = this.width ? `${this.width}px` : '';
        el.style.height = this.height ? `${this.height}px` : '';
        el.style.border = this.border ? this.border.build() : '';
        el.style.backgroundColor = this.color ? this.color : 'transparent';
    }
    get element() {
        return this.widget.element;
    }
}