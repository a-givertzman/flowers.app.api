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

import { log } from "../../core/debug.js";
import { LocalStore } from "../../infrastructure/local_store/local_store.js";
import { AppUser } from "./app_user.js";
import { AuthResult } from "./auth_result.js";
import { encrypt } from "./user_pass.js";

 /**
 * Константы статусов закупок и позиций в закупке
 */
export class Authenticate {
    #debug = true;
    #user;
    constructor({user}={}) {
        if (!user) throw SyntaxError('[Authenticate] parameter "user" is required');
        if (!(user instanceof AppUser)) throw new TypeError(`[Authenticate] parameter "user" is required, type of "AppUser", but recived ${user.constructor.name}`);
        this.#user = user;
    }
    getUser = () => this.#user
    authenticated = () => this.#user.exists();
    authenticateIfStored() {
        const storedPhoneNumber = (new LocalStore({})).readStringDecoded('user');
        log(this.#debug, '[Authenticate.authenticateIfStored] storedPhoneNumber: ', storedPhoneNumber);
        return this.#user.fetchWith({phoneNumber: storedPhoneNumber})
            .then((user) => {
                log(this.#debug, '[Authenticate.authenticateIfStored] response: ', user);
                log(this.#debug, '[Authenticate.authenticateIfStored] user.exists: ', user.exists());
                if (user.exists()) {
                    log(this.#debug, '[Authenticate.authenticateIfStored] authenticated !!!');
                    return new AuthResult({
                        authenticated: true,
                        message: 'Авторизован успешно',
                        user: user,
                    });
                } else {
                    log(this.#debug, '[Authenticate.authenticateIfStored] not authenticated !!!');
                    return new AuthResult({
                        authenticated: false,
                        message: `Сохраненный пользователь с номером ${phoneNumber} не найден.`,
                        user: user,
                    });
                }
            })
            .catch((error) => {
                log(this.#debug, `[Authenticate.authenticateIfStored] authentication error: ${error}`);
                return new AuthResult({
                    authenticated: false,
                    message: `Не удалось авторизоваться, \nОшибка: ${error}.`,
                    user: AppUser.empty(),
                });
                throw new Failure({message: `[Authenticate] error: ${error.message}`});
            });
    }
    authenticateByPhoneNumber(phoneNumber, pass) {
        log(this.#debug, '[Authenticate.authenticateByPhoneNumber] phoneNumber: ', phoneNumber);
        return this.#user.fetchWith({phoneNumber: phoneNumber})
            .then((user) => {
                log(this.#debug, '[Authenticate.authenticateByPhoneNumber] response: ', user);
                log(this.#debug, '[Authenticate.authenticateByPhoneNumber] user.exists: ', user.exists());
                if (user.exists()) {
                    log(this.#debug, '[Authenticate.authenticateByPhoneNumber] authenticated !!!');
                    if (user.pass == encrypt(pass)) {
                        new LocalStore({}).writeStringEncoded('user', user.phone);
                        return new AuthResult({
                            authenticated: true,
                            message: 'Авторизован успешно',
                            user: user,
                        });
                    } else {
                        log(this.#debug, '[Authenticate.authenticateByPhoneNumber] not authenticated !!!');
                        return new AuthResult({
                            authenticated: false,
                            message: `Неверный пароль.`,
                            user: user,
                        });
                    }
                } else {
                    log(this.#debug, '[Authenticate.authenticateByPhoneNumber] not authenticated !!!');
                    return new AuthResult({
                        authenticated: false,
                        message: `Пользователь с номером ${phoneNumber} не найден.`,
                        user: user,
                    });
                }
            })
            .catch((error) => {
                log(this.#debug, `[Authenticate.authenticateByPhoneNumber] authentication error: ${error}`);
                return new AuthResult({
                    authenticated: false,
                    message: `Не удалось авторизоваться, \nОшибка: ${error}.`,
                    user: AppUser.empty(),
                });
                throw new Failure({message: `[Authenticate] error: ${error.message}`});
            });
    }
}