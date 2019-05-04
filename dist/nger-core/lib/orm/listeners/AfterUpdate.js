"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AfterUpdateMetadataKey = 'AfterUpdateMetadataKey';
exports.AfterUpdate = () => ims_decorator_1.makeDecorator(exports.AfterUpdateMetadataKey)();
class AfterUpdatePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.AfterUpdatePropertyAst = AfterUpdatePropertyAst;
function isAfterUpdatePropertyAst(val) {
    return val.metadataKey === exports.AfterUpdateMetadataKey;
}
exports.isAfterUpdatePropertyAst = isAfterUpdatePropertyAst;
