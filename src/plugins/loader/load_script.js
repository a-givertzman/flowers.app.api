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
 * функция подгружает файл script.js на лету
 * @param {Object} params объект с параметрами ( 
 * path - путь к подгружаемому файлу; 
 * async - если true, файл будет загружен в асинхронном режиме; 
 * callback - по завершению загрузки файла)
 * @param {string} params.path путь к подгружаемому файлу
 * @param {bool} params.async усли true, файл будет загружен в асинхронном режиме
 * @param {Function} params.onLoad callback по завершению загрузки файла
 */
 export function loadScript({src: src, async: async = true, onLoad: onLoad}={}) {
    // console.log('[loadScript] async: ', async)
    const script = document.createElement('script');
    script.id = src;
    script.src = src;
    script.async = async;
    script.onload = function(e) {
        // console.log('[loadScript.onLoad] event: ', e);
        if (onLoad && typeof onLoad == 'function') {
            onLoad(e);
        }
    };
    document.head.appendChild(script);
}