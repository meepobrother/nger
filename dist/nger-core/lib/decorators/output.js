Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const rxjs_1 = require("rxjs");
exports.OutputMetadataKey = 'OutputMetadataKey';
exports.Output = ims_decorator_1.makeDecorator(exports.OutputMetadataKey);
class OutputPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.OutputPropertyAst = OutputPropertyAst;
function isOutputPropertyAst(ast) {
    return ast.metadataKey === exports.OutputMetadataKey;
}
exports.isOutputPropertyAst = isOutputPropertyAst;
class EventEmitter extends rxjs_1.Subject {
    constructor(isAsync) {
        super();
        this.__isAsync = !!isAsync;
    }
}
exports.EventEmitter = EventEmitter;
