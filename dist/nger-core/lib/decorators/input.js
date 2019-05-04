"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.InputMetadataKey = 'InputMetadataKey';
exports.Input = (bindingPropertyName) => ims_decorator_1.makeDecorator(exports.InputMetadataKey)({
    bindingPropertyName
});
class InputPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.InputPropertyAst = InputPropertyAst;
function isInputPropertyAst(ast) {
    return ast.metadataKey === exports.InputMetadataKey;
}
exports.isInputPropertyAst = isInputPropertyAst;
