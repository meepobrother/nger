Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TransactionMetadataKey = 'TransactionMetadataKey';
function Transaction(options) {
    return ims_decorator_1.makeDecorator(exports.TransactionMetadataKey)({
        options
    });
}
exports.Transaction = Transaction;
function isTransactionMethodAst(val) {
    return val.metadataKey === exports.TransactionMetadataKey;
}
exports.isTransactionMethodAst = isTransactionMethodAst;
class TransactionMethodAst extends ims_decorator_1.MethodContext {
}
exports.TransactionMethodAst = TransactionMethodAst;
