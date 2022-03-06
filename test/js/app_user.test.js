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

const newAppUser = () => new AppUser({
  remote: new DataSet({
    params: {
      // 'tableName': 'client',
    },
    apiRequest: new ApiRequest({
      url: 'https://u1489690.isp.regruhosting.ru/get-client',
    },),
  }),
});

describe('AppUser 1', () => {
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

describe('AppUser 2', () => {
  it('creating proper', () => {
    let appUser = newAppUser();
    expect(appUser.isEmpty()).toBe(false);
    expect(appUser).toBeInstanceOf(AppUser);
  });
});

describe('AppUser 3', () => {
  const okAppUserResponse = {916: { id: '916', group: 'admin', location: 'СПб', name: 'Лобанов Антон', phone: '9615258088', pass: '3201,3202,3203,3185,3216,3187,3188,3189,3246,3190,3194,3192,3193,3247,3195', account: '0.00', created: '2021-12-23 19:57:52', updated: '2022-02-25 16:32:54', deleted: null }};
  it('create', () => {
    let appUser = newAppUser();
    expect(appUser.isEmpty()).toBe(false);
    expect(appUser).toBeInstanceOf(AppUser);
  });
  it('fetch with correct param', () => {
    let appUser = newAppUser();
    return expectAsync(
      appUser.fetchWith({'phoneNumber': '9615258088'})
    ).toBeResolvedTo(okAppUserResponse);
  });
  it('fetch with fail param', () => {
    let appUser = newAppUser();
    return expectAsync(
      appUser.fetchWith({'wrongParam': '9615258088'})
    ).toBeResolvedTo({});
  });
  it('clearing', async () => {
    let appUser = newAppUser();
    let response = await appUser.fetchWith({'phoneNumber': '9615258088'});
    expect(appUser.isEmpty()).toBe(false);
    expect(appUser).toBeInstanceOf(AppUser);
    expect(response).toEqual(okAppUserResponse);
    appUser = appUser.clear();
    expect(appUser.isEmpty()).toBe(false);
    expect(appUser).toBeInstanceOf(AppUser);
    expect(appUser.id).toBe('');
    expect(appUser.name).toBe('');
    expect(appUser.phone).toBe('');
    expect(appUser.location).toBe('');
    expect(appUser.account).toBe('');
    // expect(appUser).toEqual(okAppUserResponse);
  });
});