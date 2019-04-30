Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.JoinColumnMetadataKey = 'JoinColumnMetadataKey';
function JoinColumn(options) {
    return ims_decorator_1.makeDecorator(exports.JoinColumnMetadataKey)({
        options
    });
}
exports.JoinColumn = JoinColumn;
function isJoinColumnPropertyAst(val) {
    return val.metadataKey === exports.JoinColumnMetadataKey;
}
exports.isJoinColumnPropertyAst = isJoinColumnPropertyAst;
class JoinColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.JoinColumnPropertyAst = JoinColumnPropertyAst;
