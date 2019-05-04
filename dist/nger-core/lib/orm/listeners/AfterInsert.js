"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AfterInsertMetadataKey = 'AfterInsertMetadataKey';
exports.AfterInsert = () => ims_decorator_1.makeDecorator(exports.AfterInsertMetadataKey)();
class AfterInsertPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.AfterInsertPropertyAst = AfterInsertPropertyAst;
function isAfterInsertPropertyAst(val) {
    return val.metadataKey === exports.AfterInsertMetadataKey;
}
exports.isAfterInsertPropertyAst = isAfterInsertPropertyAst;
