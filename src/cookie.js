"use strict";
//
export function getCookie(name) {
    let cookies = document.cookie
    if (cookies && cookies.length) {
        cookies = cookies.split(';');
        let findResult = cookies.find((row) => {
            return row.split('=')[0].trim() == name;
        });
        return findResult ? findResult.split('=')[1] : null;
    } else {
        return null;
    }
}

//
export function setCookie(name, value, expiresHours) {
    let dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + expiresHours);
    document.cookie = `${name}=${value}; expires=${dateNow.toUTCString()}`;
}

//
export function clearCookie() {
    let cookies = document.cookie
    if (cookies && cookies.length) {
        cookies = cookies.split(';');
        let name;
        cookies.forEach( (value, index) => {
            name = value.split('=')[0].trim();
            setCookie(name, 'null', -1);
        });
    }
}
