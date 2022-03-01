"use strict";
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