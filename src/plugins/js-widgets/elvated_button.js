"use strict";
import { Widget } from "../../plugins/js-widgets/widget.js";
// import { Widget } from "./widget";
/**
 * Текстовая кнопка
 *
 * @param {Widget} child елеиент, обычно текст выводимый на кнопке
 */
export class ElevatedButton {
    constructor({child, onPressed, onLongPress, onHover, onFocusChange, style, focusNode, autofocus = false}={}) {
        this.child = child;
        this.onPressed = onPressed;
        this.onLongPress = onLongPress;
        this.onHover = onHover;
        this.onFocusChange = onFocusChange;
        this.focusNode = focusNode;
        this.autofocus = autofocus;
        this.style = style;
        this.widget = new Widget({
            cssClass: [
                'text-button-widget',
            ]
        });
    }
    build() {
        this.child.build();
        this.widget.element.appendChild(this.child.element);
        this.widget.element.addEventListener('click', this.onPressed);
        this.widget.element.addEventListener('mouseover', this.onHover);
        this.widget.build();
    }
    get element() {
        return this.widget.element;
    }
}
