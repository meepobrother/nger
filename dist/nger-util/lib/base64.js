"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
const base = 64;
function toBase64(num) {
    let outStr = '';
    do {
        const curDigit = num % base;
        num = Math.floor(num / base);
        outStr = chars[curDigit] + outStr;
    } while (num !== 0);
    return outStr;
}
exports.toBase64 = toBase64;
exports.BLANK = Object.create(null);
