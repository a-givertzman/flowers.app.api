"use strict";
export function loadCss({path: path}={}) {
    const link = document.createElement('link');
    link.href = path;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';
    document.head.appendChild(link);
}