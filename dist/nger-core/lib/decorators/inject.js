"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.InjectMetadataKey = 'InjectMetadataKey';
exports.Inject = ims_decorator_1.makeDecorator2(exports.InjectMetadataKey, (token) => ({ token }));
class InjectConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.InjectConstructorAst = InjectConstructorAst;
class InjectPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.InjectPropertyAst = InjectPropertyAst;
function isInjectPropertyAst(ast) {
    return ast.metadataKey === exports.InjectMetadataKey;
}
exports.isInjectPropertyAst = isInjectPropertyAst;
function isInjectConstructorAst(ast) {
    return ast.metadataKey === exports.InjectMetadataKey;
}
exports.isInjectConstructorAst = isInjectConstructorAst;
