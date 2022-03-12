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

import { DataSource } from "./data_source.js";
import { DataSet } from "../../domain/core/data_set.js";
import { ApiParams } from "../api/api_params.js";
import { ApiRequest } from "../api/api_request.js";

/**
 * Константа с настройками для доступа к API, 
 * который умеет ходить в репозиторий remote и подгружать данные
 */
export const dataSource = new DataSource({
  'client': new DataSet({
    params: new ApiParams({
      'tableName': 'client',
    }),
    apiRequest: new ApiRequest({
      url: 'http://u1489690.isp.regruhosting.ru/get-client',
    }),
  }),
  'purchase': new DataSet({
    params: new ApiParams({
      'tableName': 'purchase_preview',
    }),
    apiRequest: new ApiRequest({
      url: 'http://u1489690.isp.regruhosting.ru/get-view',
    }),
  }),
  'purchase_content': new DataSet({
    params: new ApiParams({
      'tableName': 'purchase_content_preview',
      // where: [{'operator': 'where', 'field': 'id', 'cond': '=', 'value': 1}]
    }),
    apiRequest: new ApiRequest({
      url: 'http://u1489690.isp.regruhosting.ru/get-view',
    }),
  }),
  'purchase_product': new DataSet({
    params: new ApiParams({
      // 'tableName': 'purchase_content_preview',
      // where: [{'operator': 'where', 'field': 'id', 'cond': '=', 'value': 1}]
    }),
    apiRequest: new ApiRequest({
      url: 'http://u1489690.isp.regruhosting.ru/get-purchase-product',
    }),
  }),
  ///
  /// список заказов для личного кабинета пользователя
  'order_list': new DataSet({
    params: new ApiParams({
      'tableName': 'orderView',
      // where: [{'operator': 'where', 'field': 'id', 'cond': '=', 'value': 1}]
    }),
    apiRequest: new ApiRequest({
      url: 'http://u1489690.isp.regruhosting.ru/get-view',
    }),
  }),
  ///
  /// список сообщений для личного кабинета пользователя
  ///  client_id - идентификатор пользователя, для которого запрос вернет оповещения
  ///  id - идентификатор записи одного оповещения
  ///  purchase_id - идентификатор закупки для которой запрошены оповещения
  ///  purchase_content_id - идентификатор позиции закупки для которой запрошены оповещения
  ///  order = сортировка 'ASC'/'DESC'
  'notice_list': new DataSet({
    params: new ApiParams({
      // 'client_id: client_id,
      // 'id': id,
      // 'purchase_id': purchase_id,
      // 'purchase_content_id': purchase_content_id,
      // 'order': 'ASC' // 'ASC'/'DESC',
    }),
    apiRequest: new ApiRequest({
      url: 'http://u1489690.isp.regruhosting.ru/get-notice-list',
    }),
  }),
  'set_order': new DataSet({
    params: new ApiParams({
      'tableName': 'order',
    }),
    apiRequest: new ApiRequest({
      url: 'http://u1489690.isp.regruhosting.ru/set-data',
    }),
  }),
  'remove_order': new DataSet({
    params: new ApiParams({
      'tableName': 'order',
    }),
    apiRequest: new ApiRequest({
      url: 'http://u1489690.isp.regruhosting.ru/set-data',
    }),
  }),
  'set_client': new DataSet({
    params: new ApiParams({
      'tableName': 'client',
    }),
    apiRequest: new ApiRequest({
      url: 'http://u1489690.isp.regruhosting.ru/set-client',
    }),
  }),
});
