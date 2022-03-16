export function log(debug, ...args) {
    if (debug) {
        console.log(...args);
    }
}