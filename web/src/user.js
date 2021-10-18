"use strict";
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