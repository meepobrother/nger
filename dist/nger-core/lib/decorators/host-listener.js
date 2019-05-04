"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.HostListenerMetadataKey = 'HostListenerMetadataKey';
exports.HostListener = (eventName, args) => {
    return ims_decorator_1.makeDecorator(exports.HostListenerMetadataKey)({
        eventName,
        args
    });
};
class HostListenerPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.HostListenerPropertyAst = HostListenerPropertyAst;
function isHostListenerPropertyAst(ast) {
    return ast.metadataKey === exports.HostListenerMetadataKey;
}
exports.isHostListenerPropertyAst = isHostListenerPropertyAst;
