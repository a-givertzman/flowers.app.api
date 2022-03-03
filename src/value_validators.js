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
export function validateDateInput(value, useLimits = false) {
    if (isNaN(new Date(value).getTime())) {return false;}
    if (new Date(value).getTime() <= new Date().getTime()) {return false;}
    // TODO: to be implemented validation of busy dates
    // TODO: to be implemented validation of past dates
    return true;
}

export function validateNumberInput(value, useLimits = false) {
    if (isNaN(value)) {return false;}
    if (useLimits & ((value <= 0) + (value > 8))) {return false};
    return true;
}

export function validateAddressInput(value, useLimits = false) {
    if (value.length < 10 ) {return false;}
    return true;
}

export function validateWorkDescriptionInput(value, useLimits = false) {
    if (value.length < 10 ) {return false;}
    return true;
}