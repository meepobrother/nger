Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.UpdateDateColumnMetadataKey = 'UpdateDateColumnMetadataKey';
exports.UpdateDateColumn = ims_decorator_1.makeDecorator(exports.UpdateDateColumnMetadataKey);
function isUpdateDateColumnPropertyAst(val) {
    return val.metadataKey === exports.UpdateDateColumnMetadataKey;
}
exports.isUpdateDateColumnPropertyAst = isUpdateDateColumnPropertyAst;
class UpdateDateColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.UpdateDateColumnPropertyAst = UpdateDateColumnPropertyAst;
