"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.HostBindingMetadataKey = 'HostBindingMetadataKey';
exports.HostBinding = (hostPropertyName) => {
    return ims_decorator_1.makeDecorator(exports.HostBindingMetadataKey)({
        hostPropertyName
    });
};
class HostBindingPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.HostBindingPropertyAst = HostBindingPropertyAst;
function isHostBindingPropertyAst(ast) {
    return ast.metadataKey === exports.HostBindingMetadataKey;
}
exports.isHostBindingPropertyAst = isHostBindingPropertyAst;
