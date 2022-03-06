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
import { DataObject } from "../core/data_object.js";
import { DataSet } from "../core/data_set.js";

 /**
 * Константы статусов закупок и позиций в закупке
 */
export class AppUser extends DataObject {
  #debug = true;
  constructor({
    remote, // DataSet<Map>
  }={}) {
    if (!remote) throw SyntaxError('[AppUser] parameter "remote" is required');
    if (!(remote instanceof DataSet)) throw new TypeError(`[AppUser] parameter "remote" is required, type of "DataSet", but recived ${remote.constructor.name}`);
    super({remote: remote});
    this.#init();
  }
  /// Метод возвращает новый экземпляр класса
  /// с прежним remote, но без данных
  clear() {
    return new AppUser({remote: {}});
  }
  #init() {
    this['id'] = ''; //ValueString('');
    this['group'] = ''; //ValueString('');
    this['location'] = ''; //ValueString('');
    this['name'] = ''; //ValueString('');
    this['phone'] = ''; //ValueString('');
    this['pass'] = ''; //ValueString('');
    this['account'] = ''; //ValueString('');
    this['created'] = ''; //ValueString('');
    this['updated'] = ''; //ValueString('');
    this['deleted'] = ''; //ValueString('');
  }
  /// Возвращает true после загруз пользователя из базы
  /// если пользователь в базе есть, false если его там нет
  /// Возвращает null если еще не загружен
  exists() {
    if (!valid()) {
      return false;
    }
    if (valid() && '${this["id"]}' != '' && '${this["phone"]}' != '') {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Делает запрос вызывая родительский метод fetch 
   * @param {*} param0 
   * @param {any} 
   * @param {*} String 
   * @param {*} dynamic 
   * @returns Future<AppUser>
   */
  // @override
  // fetch({Map<String, dynamic> params = const {}}={}) {
  //   // TODO: implement fetch
  //   return super
  //     .fetch(params: params)
  //     .then((value) {
  //       return value as AppUser;
  //     });
  // }
}
