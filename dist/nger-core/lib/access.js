"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 权限
const ims_decorator_1 = require("ims-decorator");
exports.AccessMetadataKey = 'AccessMetadataKey';
exports.Access = ims_decorator_1.makeDecorator(exports.AccessMetadataKey);
function isAccessMethodAst(val) {
    return val.metadataKey === exports.AccessMetadataKey;
}
exports.isAccessMethodAst = isAccessMethodAst;
class AccessMethodAst extends ims_decorator_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.AccessMethodAst = AccessMethodAst;
function isAccessPropertyAst(val) {
    return val.metadataKey === exports.AccessMetadataKey;
}
exports.isAccessPropertyAst = isAccessPropertyAst;
class AccessPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.AccessPropertyAst = AccessPropertyAst;
