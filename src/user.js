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
export class User {
    static firabaseRealTimeDataBase = 'https://anna-booking-page-default-rtdb.firebaseio.com/users.json';
    
    //
    static create(user, token) {
        return fetch(User.firabaseRealTimeDataBase + `?auth=${token}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((response) => {
                user.id = response.name;
                return user;
            })
    }

    //
    static getUser(email, token) {
        if (!token) {
            console.log('[getUsers] Нет токена: ', token);
            return Promise.resolve(`<p class="error">Вы не авторизованы</p>`)
        }
        return fetch(User.firabaseRealTimeDataBase + `?auth=${token}&orderBy="email"&equalTo="${email}"&print=pretty`)
            .then((response) => response.json())
            .then((user) => {
                if (user && user.error) {
                    return `<p class="error">Ошибка при получении данных (${user.error})</p>`;
                }
                console.log('[getUsers] users: ', Object.values(user).shift());
                return user 
                    ? Object.values(user).shift()
                    : [];
            });
    }

    //
    static getUsers(token) {
        if (!token) {
            console.log('[getUsers] Нет токена: ', token);
            return Promise.resolve(`<p class="error">Вы не авторизованы</p>`)
        }
        return fetch(User.firabaseRealTimeDataBase + `?auth=${token}`)
            .then((response) => response.json())
            .then((users) => {
                if (users && users.error) {
                    return `<p class="error">Ошибка при получении данных (${users.error})</p>`;
                }
                console.log('[getUsers] users: ', users);
                return users 
                    ? Object.values(users) 
                    : [];
            });
    }
}