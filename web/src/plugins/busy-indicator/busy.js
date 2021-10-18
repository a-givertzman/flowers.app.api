"use strict";
export class BusyIndicator {
    constructor(selector, hiddenClassName) {
        this.selector = selector;
        this.hiddenClassName = hiddenClassName;
        this.busyIndicator = document.querySelector(selector);
    }
    show() {
        this.busyIndicator.classList.remove(this.hiddenClassName);
    }
    hide() {
        this.busyIndicator.classList.add(this.hiddenClassName);
    }
    toggle() {
        this.busyIndicator.classList.toggle(this.hiddenClassName)
    }
}