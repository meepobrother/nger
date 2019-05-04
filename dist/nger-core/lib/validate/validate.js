"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ValidateMetadataKey = `ValidateMetadataKey`;
exports.Validate = (validateFn) => {
    return ims_decorator_1.makeDecorator(exports.ValidateMetadataKey)({
        validateFn
    });
};
function isIsValidateAst(ast) {
    return ast.metadataKey === exports.ValidateMetadataKey;
}
exports.isIsValidateAst = isIsValidateAst;
class ValidatePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ValidatePropertyAst = ValidatePropertyAst;
