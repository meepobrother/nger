"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ChildEntityMetadataKey = 'ChildEntityMetadataKey';
exports.ChildEntity = (discriminatorValue) => ims_decorator_1.makeDecorator(exports.ChildEntityMetadataKey)({
    discriminatorValue
});
function isChildEntityClassAst(val) {
    return val.metadataKey === exports.ChildEntityMetadataKey;
}
exports.isChildEntityClassAst = isChildEntityClassAst;
class ChildEntityClassAst extends ims_decorator_1.ClassContext {
}
exports.ChildEntityClassAst = ChildEntityClassAst;
