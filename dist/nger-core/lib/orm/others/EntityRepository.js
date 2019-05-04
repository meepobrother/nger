"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
;
exports.EntityRepositoryMetadataKey = 'EntityRepositoryMetadataKey';
exports.EntityRepository = (entity) => ims_decorator_1.makeDecorator(exports.EntityRepositoryMetadataKey)({
    entity
});
function isEntityRepositoryPropertyAst(val) {
    return val.metadataKey === exports.EntityRepositoryMetadataKey;
}
exports.isEntityRepositoryPropertyAst = isEntityRepositoryPropertyAst;
class EntityRepositoryPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.EntityRepositoryPropertyAst = EntityRepositoryPropertyAst;
