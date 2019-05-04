"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PrimaryColumnMetadataKey = 'PrimaryColumnMetadataKey';
exports.PrimaryColumn = ims_decorator_1.makeDecorator(exports.PrimaryColumnMetadataKey);
function isPrimaryColumnPropertyAst(val) {
    return val.metadataKey === exports.PrimaryColumnMetadataKey;
}
exports.isPrimaryColumnPropertyAst = isPrimaryColumnPropertyAst;
class PrimaryColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.PrimaryColumnPropertyAst = PrimaryColumnPropertyAst;
