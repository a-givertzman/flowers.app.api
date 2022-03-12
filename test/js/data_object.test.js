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

import { DataObject } from "../../src/domain/core/data_object.js";
import { DataSet } from "../../src/domain/core/data_set.js";
import { ApiRequest } from "../../src/infrastructure/api/api_request.js";

describe('DataObject', () => {
    it('creating empty', () => {
        expect(() => {
            let dataObject = new DataObject({});
        }).toThrowError(SyntaxError);
        expect(() => {
            let dataObject = new DataObject({remote: {}});
        }).toThrowError(TypeError);
        let dataObject = DataObject.empty();
        expect(dataObject.isEmpty()).toBe(true);
    });
    it('creating', () => {
        let dataObject = new DataObject({
            remote: new DataSet({
                apiRequest: new ApiRequest({
                    url: '#',
                },),
                params: {},
            })
        });
        expect(dataObject.isEmpty()).toBe(false);
        expect(dataObject).toBeInstanceOf(DataObject);
    });
});