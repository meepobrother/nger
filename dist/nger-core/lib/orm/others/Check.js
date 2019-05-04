"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
;
exports.CheckMetadataKey = 'CheckMetadataKey';
exports.Check = (expression) => ims_decorator_1.makeDecorator(exports.CheckMetadataKey)({
    expression
});
class CheckPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.CheckPropertyAst = CheckPropertyAst;
function isCheckPropertyAst(val) {
    return val.metadataKey === exports.CheckMetadataKey;
}
exports.isCheckPropertyAst = isCheckPropertyAst;
