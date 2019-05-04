"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root = process.cwd();
const path_1 = require("path");
function getTypeContext(path) {
    const source = path_1.join(root, path);
    return require(source).default;
}
exports.getTypeContext = getTypeContext;
