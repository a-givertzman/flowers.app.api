"use strict";
export class BusyIndicator {
    constructor(selector, hiddenClassName) {
        this.selector = selector;
        this.hiddenClassName = hiddenClassName;
        this.busyIndicator = document.createElement('div');
        this.busyIndicator.innerHTML = this.html();
        let className = (selector.charAt(0) == '.') ? selector.slice(1) : selector;
        this.busyIndicator.classList.add(className);
        this.busyIndicator.classList.add(hiddenClassName);
        document.body.appendChild(this.busyIndicator);
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
    html() {
        return `
                <div class="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
        `;
    }
}