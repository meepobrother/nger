"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.CommandMetadataKey = 'CommandMetadataKey';
exports.Command = ims_decorator_1.makeDecorator(exports.CommandMetadataKey);
function isCommandClassAst(val) {
    return val.metadataKey === exports.CommandMetadataKey;
}
exports.isCommandClassAst = isCommandClassAst;
class CommandClassAst extends ims_decorator_1.ClassContext {
}
exports.CommandClassAst = CommandClassAst;
