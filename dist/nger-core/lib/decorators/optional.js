"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OptionalMetadataKey = 'OptionalMetadataKey';
exports.Optional = ims_decorator_1.makeDecorator(exports.OptionalMetadataKey);
class OptionalConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.OptionalConstructorAst = OptionalConstructorAst;
function isOptionalConstructorAst(ast) {
    return ast.metadataKey === exports.OptionalMetadataKey;
}
exports.isOptionalConstructorAst = isOptionalConstructorAst;
