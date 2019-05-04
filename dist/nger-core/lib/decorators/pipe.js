"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PipeMetadataKey = 'PipeMetadataKey';
exports.Pipe = ims_decorator_1.makeDecorator(exports.PipeMetadataKey);
class PipeClassAst extends ims_decorator_1.ClassContext {
}
exports.PipeClassAst = PipeClassAst;
function isPipeClassAst(ast) {
    return ast.metadataKey === exports.PipeMetadataKey;
}
exports.isPipeClassAst = isPipeClassAst;
