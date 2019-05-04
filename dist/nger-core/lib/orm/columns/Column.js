"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ColumnMetadataKey = 'ColumnMetadataKey';
exports.Column = ims_decorator_1.makeDecorator(exports.ColumnMetadataKey);
function isColumnPropertyAst(val) {
    return val.metadataKey === exports.ColumnMetadataKey;
}
exports.isColumnPropertyAst = isColumnPropertyAst;
class ColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ColumnPropertyAst = ColumnPropertyAst;
