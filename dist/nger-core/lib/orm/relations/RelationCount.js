"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.RelationCountMetadataKey = 'RelationCountMetadataKey';
exports.RelationCount = (relation, alias, queryBuilderFactory) => ims_decorator_1.makeDecorator(exports.RelationCountMetadataKey)({
    relation, alias, queryBuilderFactory
});
function isRelationCountPropertyAst(val) {
    return val.metadataKey === exports.RelationCountMetadataKey;
}
exports.isRelationCountPropertyAst = isRelationCountPropertyAst;
class RelationCountPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.RelationCountPropertyAst = RelationCountPropertyAst;
