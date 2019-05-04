"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AttributeMetadataKey = 'AttributeMetadataKey';
exports.Attribute = (name) => ims_decorator_1.makeDecorator(exports.AttributeMetadataKey)({
    attributeName: name
});
class AttributeConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.AttributeConstructorAst = AttributeConstructorAst;
function isAttributeConstructorAst(ast) {
    return ast.metadataKey === exports.AttributeMetadataKey;
}
exports.isAttributeConstructorAst = isAttributeConstructorAst;
