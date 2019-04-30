Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.EntityMetadataKey = 'EntityMetadataKey';
exports.Entity = ims_decorator_1.makeDecorator(exports.EntityMetadataKey);
function isEntityClassAst(val) {
    return val.metadataKey === exports.EntityMetadataKey;
}
exports.isEntityClassAst = isEntityClassAst;
class EntityClassAst extends ims_decorator_1.ClassContext {
}
exports.EntityClassAst = EntityClassAst;
