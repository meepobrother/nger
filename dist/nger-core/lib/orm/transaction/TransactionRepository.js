Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TransactionRepositoryMetadataKey = 'TransactionRepositoryMetadataKey';
exports.TransactionRepository = (entityType) => ims_decorator_1.makeDecorator(exports.TransactionRepositoryMetadataKey)({
    entityType
});
function isTransactionRepositoryParameterAst(val) {
    return val.metadataKey === exports.TransactionRepositoryMetadataKey;
}
exports.isTransactionRepositoryParameterAst = isTransactionRepositoryParameterAst;
class TransactionRepositoryParameterAst extends ims_decorator_1.ParameterContext {
}
exports.TransactionRepositoryParameterAst = TransactionRepositoryParameterAst;
