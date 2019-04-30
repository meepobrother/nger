Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.DirectiveMetadataKey = 'DirectiveMetadataKey';
exports.Directive = ims_decorator_1.makeDecorator(exports.DirectiveMetadataKey);
class DirectiveClassAst extends ims_decorator_1.ClassContext {
}
exports.DirectiveClassAst = DirectiveClassAst;
function isDirectiveClassAst(ast) {
    return ast.metadataKey === exports.DirectiveMetadataKey;
}
exports.isDirectiveClassAst = isDirectiveClassAst;
