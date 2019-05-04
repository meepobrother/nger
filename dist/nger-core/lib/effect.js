"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.EffectMetadataKey = 'EffectMetadataKey';
function isEffectPropertyAst(ast) {
    return ast.metadataKey === exports.EffectMetadataKey;
}
exports.isEffectPropertyAst = isEffectPropertyAst;
class EffectPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.EffectPropertyAst = EffectPropertyAst;
