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

import { DataSet } from "../../src/domain/core/data_set.js";
import { ApiRequest } from "../../src/mysql/api_request.js";

describe('DataSet', () => {
    it('creating empty', () => {
        expect(() => {
            let dataSet = new DataSet({});
        }).toThrowError(SyntaxError);
        expect(() => {
            let dataSet = new DataSet({apiRequest: {}});
        }).toThrowError(SyntaxError);
        expect(() => {
            let dataSet = new DataSet({params: {}});
        }).toThrowError(SyntaxError);
        expect(() => {
            let dataSet = new DataSet({apiRequest: {}, params: {}});
        }).toThrowError(TypeError);
        let dataSet = DataSet.empty();
        expect(dataSet.isEmpty()).toBe(true);
    });
    it('creating', () => {
        let dataSet = new DataSet({
            params: {
                'tableName': 'order',
            },
            apiRequest: new ApiRequest({
                url: 'http://u1489690.isp.regruhosting.ru/set-data',
            }),
        });
        expect(dataSet.isEmpty()).toBe(false);
        expect(dataSet).toBeInstanceOf(DataSet);
    });
});