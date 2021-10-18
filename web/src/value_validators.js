"use strict";
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