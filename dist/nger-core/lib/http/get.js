"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.GetMetadataKey = 'GetMetadataKey';
exports.Get = (path) => ims_decorator_1.makeDecorator(exports.GetMetadataKey)({
    path
});
function isGetMethodAst(val) {
    return val.metadataKey === exports.GetMetadataKey;
}
exports.isGetMethodAst = isGetMethodAst;
class GetMethodAst extends ims_decorator_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.path = def.path || this.ast.propertyKey;
    }
}
exports.GetMethodAst = GetMethodAst;
function isGetPropertyAst(val) {
    return val.metadataKey === exports.GetMetadataKey;
}
exports.isGetPropertyAst = isGetPropertyAst;
class GetPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.GetPropertyAst = GetPropertyAst;
