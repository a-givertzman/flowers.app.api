"use strict";
import { Container } from "../plugins/js-widgets/container.js";
/**
 * Главное меню приложения
 *
 * @param {User} user пользователь
 * @param {Widget} child виджет, который будет отцентрирован
 */
export class MainMenu {
    constructor({user, child}={}) {
        this.user = user;
        this.child = child;
        this.widget = new Container({
            child: child
            // cssClass: [
                // 'main-menu-widget',
            // ]
        });
    }
    build() {
        // this.child.build();
        // this.widget.element.appendChild(this.child.element);
        this.widget.build();
    }
    get element() {
        return this.widget.element;
    }
}
