Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ComponentMetadataKey = 'ComponentMetadataKey';
exports.Component = ims_decorator_1.makeDecorator(exports.ComponentMetadataKey);
class ComponentClassAst extends ims_decorator_1.ClassContext {
}
exports.ComponentClassAst = ComponentClassAst;
function isComponentClassAst(ast) {
    return ast.metadataKey === exports.ComponentMetadataKey;
}
exports.isComponentClassAst = isComponentClassAst;
