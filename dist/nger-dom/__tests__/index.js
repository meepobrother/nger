"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("document-register-element");
function h(type, props, ...children) {
    props = { ...props };
    return {
        type,
        props,
        children
    };
}
exports.h = h;
