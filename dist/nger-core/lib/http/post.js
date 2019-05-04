"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PostMetadataKey = 'PostMetadataKey';
exports.Post = (path) => ims_decorator_1.makeDecorator(exports.PostMetadataKey)({
    path
});
function isPostMethodAst(val) {
    return val.metadataKey === exports.PostMetadataKey;
}
exports.isPostMethodAst = isPostMethodAst;
class PostMethodAst extends ims_decorator_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.path = def.path || this.ast.propertyKey;
    }
}
exports.PostMethodAst = PostMethodAst;
function isPostPropertyAst(val) {
    return val.metadataKey === exports.PostMetadataKey;
}
exports.isPostPropertyAst = isPostPropertyAst;
class PostPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.PostPropertyAst = PostPropertyAst;
