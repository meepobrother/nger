Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TransactionManagerMetadataKey = 'TransactionManagerMetadataKey';
exports.TransactionManager = () => ims_decorator_1.makeDecorator(exports.TransactionManagerMetadataKey)();
function isTransactionManagerParameterAst(val) {
    return val.metadataKey === exports.TransactionManagerMetadataKey;
}
exports.isTransactionManagerParameterAst = isTransactionManagerParameterAst;
class TransactionManagerParameterAst extends ims_decorator_1.ParameterContext {
}
exports.TransactionManagerParameterAst = TransactionManagerParameterAst;
