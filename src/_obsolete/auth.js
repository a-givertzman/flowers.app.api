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
import { User } from "../user";

const API_KEY = 'AIzaSyCRCdtAtsznHZLGn4ylnDPVID8d7y3TBq8';

export function getAuthForm() {
    return `
        <ul class="mui-tabs__bar mui-tabs__bar--justified">
            <li class="mui--is-active">
                <a data-mui-toggle="tab" data-mui-controls="pane-justified-1">Авторизация</a>
            </li>
            <li>
                <a data-mui-toggle="tab" data-mui-controls="pane-justified-2">Регистрация нового пользователя</a>
            </li>
        </ul>
        <div class="mui-tabs__pane mui--is-active" id="pane-justified-1">
            <form class="mui-form" id="auth-form">
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="email" id="email-input" reqired>
                    <label for="email-input">Email </label>
                </div>
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="password" id="password-input">
                    <label for="password-input">Password</label>
                </div>
                <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary" id="sign-in-form-btn">
                    Войти
                </button>
            </form>
        </div>
        <div class="mui-tabs__pane" id="pane-justified-2">
            <form class="mui-form" id="sign-up-form">
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="name" id="name-input" reqired>
                    <label for="name-input">Имя</label>
                </div>
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="email" id="email-input" reqired>
                    <label for="email-input">Email </label>
                </div>
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="password" id="password-input">
                    <label for="password-input">Password</label>
                </div>
                <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary" id="sign-up-form-btn">
                    Зврегистрироваться
                </button>
            </form>
        </div>
    `
}

//
export function signUpWithEmailAndPassword(name, email, password, contacts) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            displayName: name,
            email: email,
            password: password,
            returnSecureToken: true,
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((response) => {
            console.log('[authWithEmailAndPassword] response: ', response);
            // добавляем новго пользователя
            let user = {
                name: response.displayName,
                email: response.email,
                contacts: contacts,
            }
            return User.create(user, response.idToken)
                .then(user => {
                    response.user = user;
                    return response
                });
        });
}

//
export function signInWithEmailAndPassword(email, password) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((response) => {
            console.log('[authWithEmailAndPassword] response: ', response);
            return response
        });
}

//
export function renderModalAfterAuth(content) {
    console.log('[renderModalAfterAuth] errorContent:', content);
    return `
        <div>${content}</div>
    `
}