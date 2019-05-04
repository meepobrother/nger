"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.SkipSelfMetadataKey = 'SkipSelfMetadataKey';
exports.SkipSelf = ims_decorator_1.makeDecorator(exports.SkipSelfMetadataKey);
class SkipSelfConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.SkipSelfConstructorAst = SkipSelfConstructorAst;
function isSkipSelfConstructorAst(ast) {
    return ast.metadataKey === exports.SkipSelfMetadataKey;
}
exports.isSkipSelfConstructorAst = isSkipSelfConstructorAst;
