Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OptionMetadataKey = 'OptionMetadataKey';
exports.Option = ims_decorator_1.makeDecorator(exports.OptionMetadataKey);
function isOptionPropertyAst(ast) {
    return ast.metadataKey === exports.OptionMetadataKey;
}
exports.isOptionPropertyAst = isOptionPropertyAst;
class OptionPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.OptionPropertyAst = OptionPropertyAst;
