"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const root = process.cwd();
const str = fs_extra_1.default.readFileSync(path_1.join(root, '.temp', 'addon/nger-demo/template/admin/ng-demo/index.template.json')).toString('utf8');
const data = JSON.parse(str);
function render(data) {
    return h => {
        return h(data.tagName || data.name, createAttribute([
            ...data.inputs || [],
            ...data.outputs || [],
            ...data.attributes || [],
            ...data.variables || [],
            ...data.references || [],
        ]), ...(data.children || []).map(child => render(child)(h)));
    };
}
function createAttribute(attrs) {
    const res = {};
    attrs.map(attr => {
        if (attr.type === 0) {
            // Property
            if (attr.name === 'className') {
                res['className'] = "";
            }
            debugger;
        }
        else if (attr.type === 1) {
            // Attribute
            debugger;
        }
        else if (attr.type === 2) {
            // Class
            debugger;
        }
        else if (attr.type === 3) {
            // Style
            debugger;
        }
        else if (attr.type === 4) {
            // Animation
            debugger;
        }
        else {
            debugger;
        }
    });
    return res;
}
function h(tag, props, ...children) {
    return {
        tag,
        props,
        children
    };
}
const res = data.map(da => render(da)(h));
debugger;
