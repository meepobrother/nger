Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ContentChildMetadataKey = 'ContentChildMetadataKey';
exports.ContentChild = (selector, opts) => {
    return ims_decorator_1.makeDecorator(exports.ContentChildMetadataKey)({
        selector, opts
    });
};
class ContentChildPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ContentChildPropertyAst = ContentChildPropertyAst;
function isContentChildPropertyAst(ast) {
    return ast.metadataKey === exports.ContentChildMetadataKey;
}
exports.isContentChildPropertyAst = isContentChildPropertyAst;
