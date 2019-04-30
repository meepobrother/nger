Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TypeormMetadataKey = 'TypeormMetadataKey';
exports.Typeorm = ims_decorator_1.makeDecorator(exports.TypeormMetadataKey);
function isTypeormClassAst(val) {
    return val.metadataKey === exports.TypeormMetadataKey;
}
exports.isTypeormClassAst = isTypeormClassAst;
class TypeormClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        this.entities = [];
        this.migrations = [];
        this.subscribers = [];
        const def = this.ast.metadataDef;
        if (def.entities)
            this.entities = this.forEachObjectToTypeContent(def.entities);
        if (def.migrations)
            this.migrations = this.forEachObjectToTypeContent(def.migrations);
        if (def.subscribers)
            this.subscribers = this.forEachObjectToTypeContent(def.subscribers);
    }
}
exports.TypeormClassAst = TypeormClassAst;
