import { makeDecorator, ParameterAst, ParameterContext } from 'ims-decorator';
export interface TransactionManager { }
export const TransactionManagerMetadataKey = 'TransactionManagerMetadataKey'
export const TransactionManager = () => makeDecorator<TransactionManager>(TransactionManagerMetadataKey)();
export function isTransactionManagerParameterAst(val: ParameterAst): val is ParameterAst<TransactionManager> {
    return val.metadataKey === TransactionManagerMetadataKey;
}
export class TransactionManagerParameterAst extends ParameterContext<TransactionManager>{ }
