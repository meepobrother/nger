Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.NgModuleMetadataKey = 'NgModuleMetadataKey';
const nger_di_1 = require("nger-di");
exports.NgModule = ims_decorator_1.makeDecorator(exports.NgModuleMetadataKey);
exports.APP_ALLREADY = new nger_di_1.InjectionToken(`APP_ALLREADY`);
class NgModuleClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        this.declarations = [];
        const def = this.ast.metadataDef;
    }
}
exports.NgModuleClassAst = NgModuleClassAst;
function isNgModuleClassAst(ast) {
    return ast.metadataKey === exports.NgModuleMetadataKey;
}
exports.isNgModuleClassAst = isNgModuleClassAst;
