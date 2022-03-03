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

/**
 * Константы статусов закупок и позиций в закупке
 */
export const PurchaseStatusList = {
  prepare: 'prepare',
  active: 'active',
  purchase: 'purchase',
  distribute: 'distribute',
  archived: 'archived',
  canceled: 'canceled',
  notsampled: 'notsampled',
}
/// Статусы разрешающие заказ товара
export const purchaseStatusOnOrder = [
  PurchaseStatusList.active,
];
/// Класс работы со статузами закупок и позиций закупок
export class PurchaseStatus {
  constructor(status) {
    this._statuses = {
      prepare: 'Подготовка',
      active: 'Сбор заказов',
      purchase: 'Закупка товара',
      distribute: 'Раздача товара',
      archived: 'В архиве',
      canceled: 'Отменена',
      notsampled: 'Не определен',
    };
    this._status = Object.keys(this._statuses).includes(status)
      ? status
      : PurchaseStatusList.notsampled;
      // : throw Failure.convertion(
      //     message: "[PurchaseStatusText] '$status' неизвестный статус",
      //     stackTrace: StackTrace.current,
      // );
  }
  /// вернет true если данный статус разрешает заказ товара
  onOrder() {
    return purchaseStatusOnOrder.contains(this._status);
  }
  /// вернет значение статуса
  value() {return this._status};
  /// вернет текстовое представление статуса
  text() {return this.textOf(this._status) };
  /// вернет текстовое представление статуса переданного в параметре
  textOf(status) {
    if (Object.keys(this._statuses).includes(status)) {
      const statusText = this._statuses[status];
      if (statusText != null) {
        return statusText;
      }
    }
    throw Error(
      `[${this.constructor.name}] ${status} - неизвестный статус`,
    );
  }
}
