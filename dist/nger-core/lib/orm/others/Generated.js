Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.GeneratedMetadataKey = 'GeneratedMetadataKey';
exports.Generated = (strategy) => ims_decorator_1.makeDecorator(exports.GeneratedMetadataKey)({
    strategy
});
class GeneratedPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.GeneratedPropertyAst = GeneratedPropertyAst;
function isGeneratedPropertyAst(val) {
    return val.metadataKey === exports.GeneratedMetadataKey;
}
exports.isGeneratedPropertyAst = isGeneratedPropertyAst;
