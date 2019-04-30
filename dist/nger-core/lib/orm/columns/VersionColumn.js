Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.VersionColumnMetadataKey = 'VersionColumnMetadataKey';
exports.VersionColumn = ims_decorator_1.makeDecorator(exports.VersionColumnMetadataKey);
function isVersionColumnPropertyAst(val) {
    return val.metadataKey === exports.VersionColumnMetadataKey;
}
exports.isVersionColumnPropertyAst = isVersionColumnPropertyAst;
class VersionColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.VersionColumnPropertyAst = VersionColumnPropertyAst;
