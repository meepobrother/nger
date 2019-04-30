Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.HostMetadataKey = 'HostMetadataKey';
exports.Host = ims_decorator_1.makeDecorator(exports.HostMetadataKey);
class HostConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.HostConstructorAst = HostConstructorAst;
function isHostConstructorAst(ast) {
    return ast.metadataKey === exports.HostMetadataKey;
}
exports.isHostConstructorAst = isHostConstructorAst;
