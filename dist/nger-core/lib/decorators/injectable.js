Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.InjectableMetadataKey = 'InjectableMetadataKey';
exports.Injectable = ims_decorator_1.makeDecorator(exports.InjectableMetadataKey);
class InjectableClassAst extends ims_decorator_1.ClassContext {
}
exports.InjectableClassAst = InjectableClassAst;
function isInjectableClassAst(ast) {
    return ast.metadataKey === exports.InjectableMetadataKey;
}
exports.isInjectableClassAst = isInjectableClassAst;
