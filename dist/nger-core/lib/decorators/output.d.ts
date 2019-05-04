import { PropertyContext, PropertyAst } from 'ims-decorator';
import { Subject, Subscription } from 'rxjs';
export declare const OutputMetadataKey = "OutputMetadataKey";
export interface OutputOptions {
    bindingPropertyName?: string;
}
export declare const Output: {
    (opt?: OutputOptions): any;
    (opt?: OutputOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: OutputOptions): any;
};
export declare class OutputPropertyAst extends PropertyContext<OutputOptions> {
}
export declare function isOutputPropertyAst(ast: PropertyAst): ast is PropertyAst<OutputOptions>;
export declare abstract class EventEmitter<T = any> extends Subject<T> {
    __isAsync: boolean;
    constructor(isAsync?: boolean);
    abstract emit(value?: T): void;
    abstract subscribe(generatorOrNext?: any, error?: any, complete?: any): Subscription;
}
