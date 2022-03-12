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
import { ApiRequest } from "../../src/infrastructure/api/api_request.js";

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
    const appUserEmpty = (user) => {
        return user.id == '' &&
        user.group == '' &&
        user.location == '' &&
        user.name == '' &&
        user.phone == '' &&
        user.pass == '' &&
        user.account == '' &&
        user.created == '' &&
        user.updated == '' &&
        user.deleted == '';
    }
    const appUserOk = (user) => {
        return user.id == '916' &&
        user.group == 'admin' &&
        user.location == 'СПб' &&
        user.name == 'Лобанов Антон' &&
        user.phone == '9615258088' &&
        user.pass == '3201,3202,3203,3185,3216,3187,3188,3189,3246,3190,3194,3192,3193,3247,3195' &&
        user.account == '0.00' &&
        user.created == '2021-12-23 19:57:52' &&
        user.updated == '2022-02-25 16:32:54' &&
        user.deleted == null;
    }
    it('create', () => {
        let appUser = newAppUser();
        expect(appUser).toBeInstanceOf(AppUser);
        expect(appUser.isEmpty()).toBe(false);
        expect(appUser.exists()).toBe(false);
    });
    it('fetch with correct param', () => {
        let appUser = newAppUser();
        return appUser.fetchWith({'phoneNumber': '9615258088'})
        .then((response) => {
            // console.log('[test AppUser 3] response: ', response);
            expect(response).toBeInstanceOf(AppUser);
            expect(response.exists()).toBe(true);
            expect(appUserOk(response)).toBe(true);
        });
    });
    it('fetch with fail param', () => {
        let appUser = newAppUser();
        return appUser.fetchWith({'wrongParam': '9615258088'})
        .then((response) => {
            // console.log('[test AppUser 3] response: ', response);
            expect(response).toBeInstanceOf(AppUser);
            expect(response.exists()).toBe(false);
            expect(appUserEmpty(response)).toBe(true);
        });
    });
    it('clearing', async () => {
        let appUser = newAppUser();
        let response = await appUser.fetchWith({'phoneNumber': '9615258088'});
        expect(appUser.isEmpty()).toBe(false);
        expect(appUser).toBeInstanceOf(AppUser);
        expect(appUserOk(response)).toBe(true);
        appUser = appUser.clear();
        expect(appUser.isEmpty()).toBe(false);
        expect(appUser).toBeInstanceOf(AppUser);
        expect(appUserEmpty(appUser)).toBe(true);
    });
});