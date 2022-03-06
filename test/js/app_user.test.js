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

import { AppUser } from "../../src/domain/auth/app_user.js";
import { DataSet } from "../../src/domain/core/data_set.js";
import { ApiRequest } from "../../src/mysql/api_request.js";

describe('AppUser', () => {
  it('creating without parameters', () => {
    expect(() => {
      let appUser = new AppUser({});
    }).toThrowError(SyntaxError);
  });
  it('creating with remote = {}', () => {
    expect(() => {
        let appUser = new AppUser({remote: {}});
    }).toThrowError(TypeError);
  });
  it('creating empty', () => {
    let appUser = AppUser.empty();
    expect(appUser.isEmpty()).toBe(true);
  });
});

describe('AppUser', () => {
  it('creating', () => {
    let appUser = new AppUser({
        remote: new DataSet({
          params: {
            'tableName': 'client',
          },
          apiRequest: new ApiRequest({
            url: 'http://u1489690.isp.regruhosting.ru/get-client',
          },),
        })
    });
    expect(appUser.isEmpty()).toBe(false);
    expect(appUser).toBeInstanceOf(AppUser);
  });
});

describe('AppUser', () => {
  it('fetch', async () => {
    var appUser = new AppUser({
      remote: new DataSet({
        params: {
          // 'tableName': 'client',
        },
        apiRequest: new ApiRequest({
          url: 'http://u1489690.isp.regruhosting.ru/get-client',
        },),
      }),
    });
    expect(appUser.isEmpty()).toBe(false);
    expect(appUser).toBeInstanceOf(AppUser);
    await appUser.fetchWith({'phoneNumber': '9615258088'})
      .then(response => {// AppUser
        console.log('AppUser.fetch response: ', response);
      })
      .catch(error => {
        console.log('AppUser.fetch error: ', error);
      });
  });
});