"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ItMetadataKey = 'ItMetadataKey';
exports.It = (topic, handler) => {
    return ims_decorator_1.makeDecorator(exports.ItMetadataKey)({
        topic, handler
    });
};
function isItMethodAst(ast) {
    return ast.metadataKey === exports.ItMetadataKey;
}
exports.isItMethodAst = isItMethodAst;
class ItMethodAst extends ims_decorator_1.MethodContext {
}
exports.ItMethodAst = ItMethodAst;
