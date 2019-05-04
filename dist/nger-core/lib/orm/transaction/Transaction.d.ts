import { MethodContext, MethodAst } from 'ims-decorator';
import { TransactionOptions } from 'typeorm';
export interface Transaction {
    options: string | TransactionOptions;
}
export declare const TransactionMetadataKey = "TransactionMetadataKey";
export declare function Transaction(connectionName?: string): MethodDecorator;
export declare function Transaction(options?: TransactionOptions): MethodDecorator;
export declare function isTransactionMethodAst(val: MethodAst): val is MethodAst<Transaction>;
export declare class TransactionMethodAst extends MethodContext<Transaction> {
}
