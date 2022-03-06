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
import { Authenticate } from "../../src/domain/auth/authenticate.js";
import { AuthResult } from "../../src/domain/auth/auth_result.js";
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
const newAuthenticate = () => new Authenticate({
  user: newAppUser(),
})

describe('Authenticate 1', () => {
  it('creating without parameters', () => {
    expect(() => {
      let auth = new Authenticate({});
    }).toThrowError(SyntaxError);
  });
  it('creating with remote = {}', () => {
    expect(() => {
      let auth = new Authenticate({user: {}});
    }).toThrowError(TypeError);
  });
  // it('creating empty', () => {
  //   let auth = Authenticate.empty();
  //   expect(auth.isEmpty()).toBe(true);
  // });
});

describe('Authenticate 2', () => {
  it('creating proper', () => {
    let auth = newAuthenticate();
    // expect(auth.isEmpty()).toBe(false);
    expect(auth).toBeInstanceOf(Authenticate);
  });
});

describe('Authenticate 3', () => {
  it('authenticate by proper phone number 9615258088', () => {
    let auth = newAuthenticate();
    expect(auth).toBeInstanceOf(Authenticate);
    expect(auth.authenticated()).toBe(false);
    expect(auth.getUser().exists()).toBe(false);
    return auth.authenticateByPhoneNumber('9615258088')
      .then((authResult) => {
        expect(authResult).toBeInstanceOf(AuthResult);
        expect(authResult.authenticated).toBe(true);
        expect(authResult.message).toBe('Авторизован успешно');
        expect(authResult.user).toBeInstanceOf(AppUser);
      });
  });
  it('authenticate by fail phone number 96152580881', () => {
    let auth = newAuthenticate();
    expect(auth).toBeInstanceOf(Authenticate);
    expect(auth.authenticated()).toBe(false);
    expect(auth.getUser().exists()).toBe(false);
    return auth.authenticateByPhoneNumber('96152580881')
      .then((authResult) => {
        console.log('[test Authenticate 3, phone=96152580881] message: ', authResult.message);
        expect(authResult).toBeInstanceOf(AuthResult);
        expect(authResult.authenticated).toBe(false);
        expect(authResult.message).toMatch(/Пользователь с номером .+ не найден/);
        expect(authResult.user).toBeInstanceOf(AppUser);
      });
  });
  it('authenticate by fail phone number 9615258a088', () => {
    let auth = newAuthenticate();
    expect(auth).toBeInstanceOf(Authenticate);
    expect(auth.authenticated()).toBe(false);
    expect(auth.getUser().exists()).toBe(false);
    return auth.authenticateByPhoneNumber('9615258a088')
      .then((authResult) => {
        console.log('[test Authenticate 3, phone=9615258a088] message: ', authResult.message);
        expect(authResult).toBeInstanceOf(AuthResult);
        expect(authResult.authenticated).toBe(false);
        expect(authResult.message).toMatch(/Пользователь с номером .+ не найден/);
        expect(authResult.user).toBeInstanceOf(AppUser);
      });
  });
});