"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TreeParentMetadataKey = 'TreeParentMetadataKey';
exports.TreeParent = () => ims_decorator_1.makeDecorator(exports.TreeParentMetadataKey)();
function isTreeParentPropertyAst(val) {
    return val.metadataKey === exports.TreeParentMetadataKey;
}
exports.isTreeParentPropertyAst = isTreeParentPropertyAst;
class TreeParentPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.TreeParentPropertyAst = TreeParentPropertyAst;
