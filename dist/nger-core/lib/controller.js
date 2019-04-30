Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ControllerMetadataKey = 'ControllerMetadataKey';
function Controller(path) {
    const decorator = ims_decorator_1.makeDecorator(exports.ControllerMetadataKey);
    if (typeof path === 'string') {
        return decorator({
            path
        });
    }
    else {
        return decorator(path);
    }
}
exports.Controller = Controller;
class ControllerClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        let def = this.ast.metadataDef;
        def.path = def.path || `/${this.ast.target.name}`;
        if (def && def.path) {
            if (def.path.startsWith('/')) {
                if (def.path === '/') {
                    this.path = '';
                }
                else {
                    this.path = def.path;
                }
            }
            else {
                console.error(`controller path must start with '/'`);
            }
        }
    }
}
exports.ControllerClassAst = ControllerClassAst;
function isControllerClassAst(ast) {
    return ast.metadataKey === exports.ControllerMetadataKey;
}
exports.isControllerClassAst = isControllerClassAst;
