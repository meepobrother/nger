Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.UniqueMetadataKey = 'UniqueMetadataKey';
function Unique(name, fields) {
    if (typeof name === 'function') {
        fields = name;
        name = null;
    }
    else if (Array.isArray(name)) {
        fields = name;
        name = null;
    }
    return ims_decorator_1.makeDecorator(exports.UniqueMetadataKey)({
        name, fields
    });
}
exports.Unique = Unique;
class UniquePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.UniquePropertyAst = UniquePropertyAst;
function isUniquePropertyAst(val) {
    return val.metadataKey === exports.UniqueMetadataKey;
}
exports.isUniquePropertyAst = isUniquePropertyAst;
