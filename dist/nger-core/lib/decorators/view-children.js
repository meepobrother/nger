Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ViewChildrenMetadataKey = 'ViewChildrenMetadataKey';
exports.ViewChildren = (selector, opts) => {
    return ims_decorator_1.makeDecorator(exports.ViewChildrenMetadataKey)({
        selector, opts
    });
};
class ViewChildrenPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ViewChildrenPropertyAst = ViewChildrenPropertyAst;
function isViewChildrenPropertyAst(ast) {
    return ast.metadataKey === exports.ViewChildrenMetadataKey;
}
exports.isViewChildrenPropertyAst = isViewChildrenPropertyAst;
