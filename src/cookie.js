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
//
export function getCookie(name) {
    let cookies = document.cookie
    if (cookies && cookies.length) {
        cookies = cookies.split(';');
        let findResult = cookies.find((row) => {
            return row.split('=')[0].trim() == name;
        });
        return findResult ? findResult.split('=')[1] : null;
    } else {
        return null;
    }
}

//
export function setCookie(name, value, expiresHours) {
    let dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + expiresHours);
    document.cookie = `${name}=${value}; expires=${dateNow.toUTCString()}`;
}

//
export function clearCookie() {
    let cookies = document.cookie
    if (cookies && cookies.length) {
        cookies = cookies.split(';');
        let name;
        cookies.forEach( (value, index) => {
            name = value.split('=')[0].trim();
            setCookie(name, 'null', -1);
        });
    }
}
