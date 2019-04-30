Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ObjectIdColumnMetadataKey = 'ObjectIdColumnMetadataKey';
exports.ObjectIdColumn = ims_decorator_1.makeDecorator(exports.ObjectIdColumnMetadataKey);
function isObjectIdColumnPropertyAst(val) {
    return val.metadataKey === exports.ObjectIdColumnMetadataKey;
}
exports.isObjectIdColumnPropertyAst = isObjectIdColumnPropertyAst;
class ObjectIdColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ObjectIdColumnPropertyAst = ObjectIdColumnPropertyAst;
