import { makeDecorator, ParameterAst, ParameterContext } from 'ims-decorator';
export interface TransactionRepository {
    entityType?: Function
}
export const TransactionRepositoryMetadataKey = 'TransactionRepositoryMetadataKey'
export const TransactionRepository = (entityType?: Function) => makeDecorator<TransactionRepository>(TransactionRepositoryMetadataKey)({
    entityType
});
export function isTransactionRepositoryParameterAst(val: ParameterAst): val is ParameterAst<TransactionRepository> {
    return val.metadataKey === TransactionRepositoryMetadataKey;
}
export class TransactionRepositoryParameterAst extends ParameterContext<TransactionRepository>{ }