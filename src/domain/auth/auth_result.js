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

import { AppUser } from "./app_user.js";
/**
 * Результат авторизации
 * @param {Object} params объект с параметрами
 * @param {bool} params.authenticated результат автоизации
 * @param {string} params.message сообщение ok / об ошибке
 * @param {AppUser} params.user сообщение ok / об ошибке
 */
export class AuthResult {
  #authenticated;
  #message;
  #user;
  AuthResult({
    authenticated,
    message,
    user,
  }={}) {
    if (!authenticated) throw Error('[AuthResult] parameter authenticated is required');
    if (!message) throw Error('[AuthResult] parameter authenticated is required');
    if (!user) throw Error('[AuthResult] parameter authenticated is required');
    this.#authenticated = authenticated, 
    this.#message = message,
    this.#user = user;
  }
  authenticated = () => this.#authenticated;
  message = () => this.#message;
  user = () => this.#user;
}
