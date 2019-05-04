"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.CreateDateColumnMetadataKey = 'CreateDateColumnMetadataKey';
exports.CreateDateColumn = ims_decorator_1.makeDecorator(exports.CreateDateColumnMetadataKey);
function isCreateDateColumnPropertyAst(val) {
    return val.metadataKey === exports.CreateDateColumnMetadataKey;
}
exports.isCreateDateColumnPropertyAst = isCreateDateColumnPropertyAst;
class CreateDateColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.CreateDateColumnPropertyAst = CreateDateColumnPropertyAst;
