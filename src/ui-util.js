"use strict";
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2021 Anton Lobanov

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { submitSelectUserHandler } from "./app";

export function createModalWindow(title, content, styleClass) {
    const modalWindow = document.createElement('div');
    modalWindow.classList.add(styleClass);
    modalWindow.innerHTML = `
        <h1>${title}</h1>
        <div class="${styleClass}-content">${content}</div>
    `;
    return mui.overlay('on', modalWindow);;
}

export function closeModalWindow() {
    mui.overlay('off');
}

//
//declOfNum(days, ['день', 'дня', 'дней']);
//declOfNum(minutes, ['минута', 'минуты', 'минут']);
//declOfNum(seconds, ['секунда', 'секунды', 'секунд']);
export function declOfNum(number, titles) {  
    var  cases = [2, 0, 1, 1, 1, 2];  
    return titles[ 
        (number % 100 > 4 && number % 100 < 20) 
        ? 
        2 
        : 
        cases[(number % 10 < 5) ? number % 10 : 5] 
    ];  
}

//
export function declOfHours(hours, titles = ['час', 'часа', 'часов']) {  
    var  cases = [2, 0, 1, 1, 1, 2];  
    return titles[ 
        (hours % 100 > 4 && hours % 100 < 20) 
        ? 
        2 
        : 
        cases[(hours % 10 < 5) ? hours % 10 : 5] 
    ];  
}

//
export function renderAuthBtn(userName, userEmail) {
    return `
        ${userEmail}<br/>
        <small>${userName}</small>
    `;
}

//
export function renderSelectUserBtn(users) {
    console.log('[renderSelectUserBtn] users: ', users);
    let userNavigator = document.querySelector('#user-navigator');
    userNavigator.innerHTML = `
    ${users.map((user) => {
        return `
                <li class="user-navigator-item" id="show-${user.email}-btn" email="${user.email}">
                    <a href="#">${user.name} (${user.email})</a>
                </li>
            `
        }).join('')}
    `;
    let userButtons = userNavigator.children;
    [...userButtons].forEach(button => {
        button.addEventListener('click', event => submitSelectUserHandler(event));
    });
}

//
export function hideElement(element) {
    if (element) {
        element.style.visibility = 'hidden';
    }
}

//
export function showElement(element) {
    if (element) {
        element.style.visibility = 'visible';
    }
}