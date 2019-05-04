"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ContentChildrenMetadataKey = 'ContentChildrenMetadataKey';
exports.ContentChildren = (selector, opts) => {
    return ims_decorator_1.makeDecorator(exports.ContentChildrenMetadataKey)({
        selector, opts
    });
};
class ContentChildrenPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ContentChildrenPropertyAst = ContentChildrenPropertyAst;
function isContentChildrenPropertyAst(ast) {
    return ast.metadataKey === exports.ContentChildrenMetadataKey;
}
exports.isContentChildrenPropertyAst = isContentChildrenPropertyAst;
