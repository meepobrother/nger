import { ParameterAst, ParameterContext } from 'ims-decorator';
export interface TransactionManager {
}
export declare const TransactionManagerMetadataKey = "TransactionManagerMetadataKey";
export declare const TransactionManager: () => any;
export declare function isTransactionManagerParameterAst(val: ParameterAst): val is ParameterAst<TransactionManager>;
export declare class TransactionManagerParameterAst extends ParameterContext<TransactionManager> {
}
