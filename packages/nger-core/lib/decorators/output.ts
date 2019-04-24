import { makeDecorator, ClassAst, PropertyContext, PropertyAst } from 'ims-decorator';
import { Subject, Subscription } from 'rxjs'

export const OutputMetadataKey = 'OutputMetadataKey';
export interface OutputOptions {
    bindingPropertyName?: string;
}
export const Output = makeDecorator<OutputOptions>(OutputMetadataKey);
export class OutputPropertyAst extends PropertyContext<OutputOptions> { }
export function isOutputPropertyAst(ast: PropertyAst): ast is PropertyAst<OutputOptions> {
    return ast.metadataKey === OutputMetadataKey;
}
export abstract class EventEmitter<T = any> extends Subject<T> {
    public __isAsync: boolean;
    constructor(isAsync?: boolean) {
        super();
        this.__isAsync = !!isAsync;
    }
    abstract emit(value?: T): void;
    abstract subscribe(generatorOrNext?: any, error?: any, complete?: any): Subscription;
}
