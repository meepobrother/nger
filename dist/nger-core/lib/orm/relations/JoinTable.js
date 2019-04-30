Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.JoinTableMetadataKey = 'JoinTableMetadataKey';
function JoinTable(options) {
    return ims_decorator_1.makeDecorator(exports.JoinTableMetadataKey)({ options });
}
exports.JoinTable = JoinTable;
function isJoinTablePropertyAst(val) {
    return val.metadataKey === exports.JoinTableMetadataKey;
}
exports.isJoinTablePropertyAst = isJoinTablePropertyAst;
class JoinTablePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.JoinTablePropertyAst = JoinTablePropertyAst;
