"use strict";
/**
 * Создает объект приложение
 *
 * @param {Widget} child корневой виджет приложения
 */
class App {
    constructor({child: child}={}) {
        this.child = child;
    }
    run() {
        this._element = document.body;
        if (this.child) {
            this._element.appendChild(this.child.element);
        }
        this.child.build();
    }
}
