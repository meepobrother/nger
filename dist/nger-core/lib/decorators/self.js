"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.SelfMetadataKey = 'SelfMetadataKey';
exports.Self = ims_decorator_1.makeDecorator(exports.SelfMetadataKey);
class SelfConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.SelfConstructorAst = SelfConstructorAst;
function isSelfConstructorAst(ast) {
    return ast.metadataKey === exports.SelfMetadataKey;
}
exports.isSelfConstructorAst = isSelfConstructorAst;
