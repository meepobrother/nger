"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFlattenFn = (arr) => {
    arr = Array.isArray(arr) ? arr : [arr];
    return [].concat(...arr.map(v => Array.isArray(v) ? exports.deepFlattenFn(v) : v));
};
