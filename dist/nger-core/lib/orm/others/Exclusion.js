"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
;
exports.ExclusionMetadataKey = 'ExclusionMetadataKey';
exports.Exclusion = (expression) => ims_decorator_1.makeDecorator(exports.ExclusionMetadataKey)({
    expression
});
class ExclusionPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ExclusionPropertyAst = ExclusionPropertyAst;
function isExclusionPropertyAst(val) {
    return val.metadataKey === exports.ExclusionMetadataKey;
}
exports.isExclusionPropertyAst = isExclusionPropertyAst;
