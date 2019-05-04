"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TreeMetadataKey = 'TreeMetadataKey';
exports.Tree = (type) => ims_decorator_1.makeDecorator(exports.TreeMetadataKey)({
    type
});
function isTreeClassAst(val) {
    return val.metadataKey === exports.TreeMetadataKey;
}
exports.isTreeClassAst = isTreeClassAst;
class TreeClassAst extends ims_decorator_1.ClassContext {
}
exports.TreeClassAst = TreeClassAst;
