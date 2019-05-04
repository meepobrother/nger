"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ViewChildMetadataKey = 'ViewChildMetadataKey';
exports.ViewChild = (selector, opts) => {
    return ims_decorator_1.makeDecorator(exports.ViewChildMetadataKey)({
        selector, opts
    });
};
class ViewChildPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ViewChildPropertyAst = ViewChildPropertyAst;
function isViewChildPropertyAst(ast) {
    return ast.metadataKey === exports.ViewChildMetadataKey;
}
exports.isViewChildPropertyAst = isViewChildPropertyAst;
