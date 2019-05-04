"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
const relativePath = /^\.?\.\//;
function isAbsolute(path) {
    return absolutePath.test(path);
}
exports.isAbsolute = isAbsolute;
function isRelative(path) {
    return relativePath.test(path);
}
exports.isRelative = isRelative;
function normalize(path) {
    if (path.indexOf('\\') == -1)
        return path;
    return path.replace(/\\/g, '/');
}
exports.normalize = normalize;
var path_1 = require("path");
exports.basename = path_1.basename;
exports.dirname = path_1.dirname;
exports.extname = path_1.extname;
exports.relative = path_1.relative;
exports.resolve = path_1.resolve;
