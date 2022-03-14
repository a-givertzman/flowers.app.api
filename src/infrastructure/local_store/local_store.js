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

/**
 * Класс реализует чтение и запись данных
 * простых типов в локальное хранилище
 * так же поддерживает шифрование данных 
 * в юникод utf8 и затем в base64 string 
 */
export class LocalStore {
    #debug = true;
    constructor({}={}) {

    }
    #getPrefs() {
        log(this.#debug, '[LocalStore._getPrefs] document.cookie: ', document.cookie);
        const prefs = document.cookie
            .split(';')
            .map(c => {
                return c.trim();
            });
        log(this.#debug, '[LocalStore._getPrefs] prefs: ', prefs);
        return prefs;
    }
    #parseCookie(cookie) {
        if (!cookie) throw SyntaxError(`[LocalStore] wrong cookie: ${cookie}`);
        const cookieArray = cookie.split('=');
        if (cookieArray.length < 2) {
            return undefined;
            // throw SyntaxError(`[LocalStore] wrong cookie: ${cookie}`);
        }
        return {key: cookieArray[0], value: cookieArray[1]};
    }
    writeValue(key, value) {
        try {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            document.cookie = `${key}=${value};expires=${date.toUTCString()};domain=;path=`;
            return true;
        } catch (error) {
            return false;
        }
    }
    readValue(key) {
        const cookie = this.#getPrefs().find(row => row.startsWith(key));
        if (!cookie) return undefined;
        const cookieObj = this.#parseCookie(cookie);
        return cookieObj
            ? cookieObj.value
            : undefined;
    }
    /// Метод вернет строку как есть (без расшифровки) из localStore
    readString(key) {
        return _readValue();
        // .then((prefs) {
        //     const value = prefs.getString(key) ?? '';
        //     log(_debug, '[LocalStore.readRawString] key: $key;\tfound value: $value');
        //     return value;
        // });
    }
    // Метод сохранит строку как есть (без шифрования) в localStore
    writeString(key, value) {
        // return _getPrefs().then((prefs) {
        //     return prefs.setString(key, value).then((result) {
        //         log(_debug, '[LocalStore.writeRawString] key: $key;\twritten value: $value');
        //         return result;
        //     });
        // });
    }
    /// Метод вернет строку с расшифровкой из localStore
    readStringDecoded(key) {
        const value = this.decodeStr(this.readValue(key));
        log(this.#debug, `[LocalStore.readStringDecoded] key: ${key};\tvalue: ${value}`);
        return value;
    }
    /// Метод сохранит строку с шифрованем в localStore
    writeStringEncoded(key, value) {
        return this.writeValue(
            key,
            this.encodeStr(value)
        );
    }
    clear() {
        this.#getPrefs()
            .forEach(cookie => {
                log(this.#debug, `[LocalStore.clear] cookie: ${cookie}`);
                const cookieParsed = this.#parseCookie(cookie);
                if (cookieParsed) {
                    this.remove(cookieParsed.key);
                }
            });
    }
    remove(key) {
        document.cookie = `${key}=;expires=${new Date().toUTCString()};domain=;path=`;
    }
    encodeStr(value) {
        const bytes = encodeURI(value);
        const codeStr = this.#encode(bytes);
        log(this.#debug, `[LocalStore.encodeStr] str: ${value} to ${codeStr}`);
        return codeStr;
    }
    #encode(value) {
        return value
            .split('')
            .map(char => {
                const code = `${char.charCodeAt(0)}`;
                // log(this.#debug, `[LocalStore.encode] char: ${char}   code: ${code}`);
                return code;
            })
            .join(',');
    }
    decodeStr(value) {
        log(this.#debug, `[LocalStore.decodeStr] value: ${value}`);
        const encodedStr = this.#decode(value);
        log(this.#debug, `[LocalStore.decodeStr] encodedStr: ${encodedStr}`);
        const str = decodeURI(encodedStr);
        log(this.#debug, `[LocalStore.decodeStr] value: ${value} to ${str}`);
        return str;
    }
    #decode(value) {
        if (!value) return '';
        log(this.#debug, `[LocalStore.#decode] value: ${value}`);
        const arr = value.split(',');
        log(this.#debug, `[LocalStore.#decode] arr: ${arr}`);
        const str = String.fromCharCode(...arr);
        log(this.#debug, `[LocalStore.#decode] str: ${str}`);
        return str;
    }
}
