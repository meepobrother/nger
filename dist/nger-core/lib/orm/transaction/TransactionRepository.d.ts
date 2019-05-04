import { ParameterAst, ParameterContext } from 'ims-decorator';
export interface TransactionRepository {
    entityType?: Function;
}
export declare const TransactionRepositoryMetadataKey = "TransactionRepositoryMetadataKey";
export declare const TransactionRepository: (entityType?: Function) => any;
export declare function isTransactionRepositoryParameterAst(val: ParameterAst): val is ParameterAst<TransactionRepository>;
export declare class TransactionRepositoryParameterAst extends ParameterContext<TransactionRepository> {
}
