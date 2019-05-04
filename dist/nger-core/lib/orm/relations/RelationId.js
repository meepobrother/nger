"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.RelationIdMetadataKey = 'RelationIdMetadataKey';
exports.RelationId = (relation, alias, queryBuilderFactory) => ims_decorator_1.makeDecorator(exports.RelationIdMetadataKey)({
    relation,
    alias,
    queryBuilderFactory
});
function isRelationIdPropertyAst(val) {
    return val.metadataKey === exports.RelationIdMetadataKey;
}
exports.isRelationIdPropertyAst = isRelationIdPropertyAst;
class RelationIdPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.RelationIdPropertyAst = RelationIdPropertyAst;
