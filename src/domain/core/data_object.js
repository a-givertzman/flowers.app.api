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
import { DataSet } from "./data_set.js";

/**
 * Класс с данными, 
 * который умеет ходить в репозиторий remote и подгружать данные
 */
export class DataObject {
    #dedug = true;
    #remote;
    #isEmpty;
    #isValid = false;
    constructor({remote: remote}={}) {
        log(this.#dedug, '[DataObject] remote: ', remote);
        if (!remote) throw new SyntaxError('[DataObject] parameter "remote" is required');
        log(this.#dedug, '[DataObject] typeof remote: ', remote.constructor.name);
        if (!(remote instanceof DataSet)) throw new TypeError(`[DataObject] parameter "remote" is required, type of "DataSet", but recived ${remote.constructor.name}`);
        this.#remote = remote;
        this.#isEmpty = remote.isEmpty();
    }
    isEmpty = () => this.#isEmpty;
    isValid = () => this.#isValid;
    static empty() {
        return new DataObject({remote: DataSet.empty()});
    }
    fetch() {
        return this.fetchWith({})
            .then(response => {
                log(this.#dedug, '[DataObject.fetchWith] response: ', response);
                return response;
            });
    }
    fetchWith(params) {
        log(this.#dedug, '[DataObject.fetchWith] params: ', params);
        var self = this;
        return this.#remote
            .fetchWith(params)
            .then(response => {
                log(this.#dedug, '[DataObject.fetchWith] response: ', response);
                const data = response[Object.keys(response)[0]];
                log(this.#dedug, '[DataObject.fetchWith] data: ', data);
                for(const key in data) {
                    const value = data[key];
                    this[key] = value;
                }
                this.#isValid = true;
                return self;
            })
            .catch(error => {
                this.#isValid = false;
                throw new Failure({message: `[DataObject] error: ${error.message}`});
            });
    }
}