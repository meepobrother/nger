"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PageMetadataKey = 'PageMetadataKey';
exports.Page = ims_decorator_1.makeDecorator(exports.PageMetadataKey);
class PageClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        if (def.path)
            this.path = def.path;
    }
}
exports.PageClassAst = PageClassAst;
function isPageClassAst(ast) {
    return ast.metadataKey === exports.PageMetadataKey;
}
exports.isPageClassAst = isPageClassAst;
