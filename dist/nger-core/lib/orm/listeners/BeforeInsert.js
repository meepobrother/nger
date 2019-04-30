Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.BeforeInsertMetadataKey = 'BeforeInsertMetadataKey';
exports.BeforeInsert = () => ims_decorator_1.makeDecorator(exports.BeforeInsertMetadataKey)();
class BeforeInsertPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.BeforeInsertPropertyAst = BeforeInsertPropertyAst;
function isBeforeInsertPropertyAst(val) {
    return val.metadataKey === exports.BeforeInsertMetadataKey;
}
exports.isBeforeInsertPropertyAst = isBeforeInsertPropertyAst;
