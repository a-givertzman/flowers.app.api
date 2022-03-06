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
import { DataSet } from "../core/data_set.js";
import { ApiRequest } from "../../mysql/api_request.js";

test('Test AppUser creating empty', () => {
    expect(() => {
        let appUser = new AppUser({});
    }).toThrowError(SyntaxError);
    expect(() => {
        let appUser = new AppUser({remote: {}});
    }).toThrowError(TypeError);
    let appUser = AppUser.empty();
    expect(appUser.isEmpty()).toBe(true);
});

test('Test AppUser creating', () => {
    let appUser = new AppUser({
        remote: new DataSet({
          params: {
            'tableName': 'client',
          },
          apiRequest: new ApiRequest({
            url: 'http://u1489690.isp.regruhosting.ru/set-client',
          },),
        })
    });
    expect(appUser.isEmpty()).toBe(false);
    expect(appUser).toBeInstanceOf(AppUser);
});

test('Test AppUser fetch', async () => {
  let appUser = new AppUser({
      remote: new DataSet({
        params: {
          'tableName': 'client',
        },
        apiRequest: new ApiRequest({
          url: 'http://u1489690.isp.regruhosting.ru/set-client',
        },),
      })
  });
  expect(appUser.isEmpty()).toBe(false);
  expect(appUser).toBeInstanceOf(AppUser);
  await appUser.fetchWith({test: 'testParam'})
    .then(response => {// AppUser
      console.log('AppUser.fetch response: ', response);
    })
    .catch(error => {
      console.log('AppUser.fetch error: ', error);
    })
});