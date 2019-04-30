Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.BeforeRemoveMetadataKey = 'BeforeRemoveMetadataKey';
exports.BeforeRemove = () => ims_decorator_1.makeDecorator(exports.BeforeRemoveMetadataKey)();
class BeforeRemovePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.BeforeRemovePropertyAst = BeforeRemovePropertyAst;
function isBeforeRemovePropertyAst(val) {
    return val.metadataKey === exports.BeforeRemoveMetadataKey;
}
exports.isBeforeRemovePropertyAst = isBeforeRemovePropertyAst;
