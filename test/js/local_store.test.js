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

import { log } from "../../src/core/debug.js";
import { LocalStore } from "../../src/infrastructure/local_store/local_store.js";

const _debug = true;
const localStore = new LocalStore({
});

describe('LocalStore', () => {
    const cookies = [
        {key: 'login0', value: '9615258088'},
        {key: 'login1', value: '9615258088 1'},
        {key: 'login2', value: '9615258088_2'},
        {key: 'login3', value: '9615258088_3'},
    ];
    var result = '';
    it('writeValue', () => {
        expect(() => {
            cookies.forEach(cookie => {
                result = localStore.writeValue(cookie.key, cookie.value);
                log(_debug, '[Test.LocalStore.writeValue] write: ', cookie);
                log(_debug, '[Test.LocalStore.writeValue] result: ', result);
                expect(result).toBe(true);
            })
        }).not.toThrow();
    });
    it('readValue', () => {
        expect(() => {
            cookies.forEach(cookie => {
                const value = localStore.readValue(cookie.key);
                log(_debug, '[Test.LocalStore.readValue] key: ', cookie.key, ';   value: ', value);
                expect(value).toBe(cookie.value);
            });
        }).not.toThrow();
    });
    it('writeStringEncoded', () => {
        expect(() => {
            cookies.forEach(cookie => {
                result = localStore.writeStringEncoded(cookie.key, cookie.value);
                log(_debug, '[Test.LocalStore.writeStringEncoded] write: ', cookie);
                log(_debug, '[Test.LocalStore.writeStringEncoded] result: ', result);
                expect(result).toBe(true);
            });
        }).not.toThrow();
    });
    it('readStringDecoded', () => {
        expect(() => {
            cookies.forEach(cookie => {
                const value = localStore.readStringDecoded(cookie.key);
                log(_debug, '[Test.LocalStore.readStringDecoded] key: ', cookie.key, ';   value: ', value);
                expect(value).toBe(cookie.value);
            });
        }).not.toThrow();
    });
    it('clear', () => {
        expect(() => {
            localStore.clear();
        }).not.toThrow();
        expect(() => {
            cookies.forEach(cookie => {
                log(_debug, '[Test.LocalStore.clear] key: ', cookie.key);
                const value = localStore.readValue(cookie.key);
                log(_debug, '[Test.LocalStore.clear] value: ', value);
                expect(value).toBe(undefined);
            });
        }).not.toThrow();
    });
});
