Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TreeLevelColumnMetadataKey = 'TreeLevelColumnMetadataKey';
exports.TreeLevelColumn = () => ims_decorator_1.makeDecorator(exports.TreeLevelColumnMetadataKey)();
function isTreeLevelColumnPropertyAst(val) {
    return val.metadataKey === exports.TreeLevelColumnMetadataKey;
}
exports.isTreeLevelColumnPropertyAst = isTreeLevelColumnPropertyAst;
class TreeLevelColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.TreeLevelColumnPropertyAst = TreeLevelColumnPropertyAst;
