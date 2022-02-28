"use strict";
/**
 * Бордюр элемента
 *
 */
export class Border {
    constructor({color, width, radius}={}) {
        this.color = color;
        this.width = width;
        this.radius = radius;
    }
    static all({color, width}={}) {
        return new Border({
            color: color,
            width: width,
            radius: 0,
        });
    }
    build() {
        return `${this.width}px solid ${this.color}`;
    }
}