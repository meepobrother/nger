import { makeDecorator, MethodContext, MethodAst } from 'ims-decorator';
import { TransactionOptions } from 'typeorm'
export interface Transaction {
    options: string | TransactionOptions;
}
export const TransactionMetadataKey = 'TransactionMetadataKey'
export function Transaction(connectionName?: string): MethodDecorator;
export function Transaction(options?: TransactionOptions): MethodDecorator;
export function Transaction(options?: any) {
    return makeDecorator<Transaction>(TransactionMetadataKey)({
        options
    })
}
export function isTransactionMethodAst(val: MethodAst): val is MethodAst<Transaction> {
    return val.metadataKey === TransactionMetadataKey;
}
export class TransactionMethodAst extends MethodContext<Transaction>{ }