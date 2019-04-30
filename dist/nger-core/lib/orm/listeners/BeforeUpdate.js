Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.BeforeUpdateMetadataKey = 'BeforeUpdateMetadataKey';
exports.BeforeUpdate = () => ims_decorator_1.makeDecorator(exports.BeforeUpdateMetadataKey)();
class BeforeUpdatePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.BeforeUpdatePropertyAst = BeforeUpdatePropertyAst;
function isBeforeUpdatePropertyAst(val) {
    return val.metadataKey === exports.BeforeUpdateMetadataKey;
}
exports.isBeforeUpdatePropertyAst = isBeforeUpdatePropertyAst;
