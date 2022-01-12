"use strict";
// import { Widget } from "../src/plugins/js-widgets/widget";
/**
 * Создает главное меню приложения
 *
 * @param {User} user пользователь
 */
class MainMenu {
    constructor({user, child}={}) {
        this.user = user;
        this.child = child;
        this.widget = new Widget({
            cssClass: [
                'main-menu-widget',
            ]
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
