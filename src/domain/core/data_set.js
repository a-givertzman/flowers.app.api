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
import { ApiRequest } from "../../infrastructure/api/api_request.js";
import { NetworkFailure } from "../failure/failure.js";

/**
 * Класс с данными, 
 * который умеет ходить в репозиторий remote и подгружать данные
 */
export class DataSet {
    #debug = true;
    #apiRequest;    // ApiRequest
    #params;        // ApiParams
    #isEmpty;
    constructor({
        apiRequest, 
        params, 
        empty = false
    }={}) {
        if (!params) throw SyntaxError('[DataSet] parameter "params" is required');
        if (!apiRequest) throw SyntaxError('[DataSet] parameter "apiRequest" is required');
        if (!(apiRequest instanceof ApiRequest)) throw TypeError('[DataSet] parameter "apiRequest" is required, type of ApiRequest');
        this.#apiRequest = apiRequest;
        this.#params = params;
        this.#isEmpty = empty;
    }
    isEmpty = () => this.#isEmpty;
    static empty() {
        return new DataSet({
            apiRequest: ApiRequest.empty(), 
            params: {},
            empty: true,
        });
    }
    fetch() {
        log(this.#debug, '[DataSet.fetch]');
        log(this.#debug, '[DataSet.fetch] apiRequest: ', this.#apiRequest);
        log(this.#debug, '[DataSet.fetch] params: ', this.#params);
        return this.#fetch(
            this.#apiRequest,
            this.#params,
        )
    }
    fetchWith(params) {
        log(this.#debug, '[DataSet.fetchWith] params: ', params);
        let uParams = {...this.#params, ...params};
        return this.#fetch(
            this.#apiRequest,
            uParams,
        );
    }
    #fetch(apiRequest, params) {
        log(this.#debug, '[DataSet.#fetch] apiRequest: ', apiRequest);
        log(this.#debug, '[DataSet.#fetch] params: ', params);
        return apiRequest.fetchData(params)
            .then(response => {
                log(this.#debug, '[DataSet.#fetch] response: ', response);
                return response;
            })
            .catch(error => {
                throw new NetworkFailure({message: `[DataSet] error: ${error.message}`});
            })
    }
}