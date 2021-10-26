"use strict";
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