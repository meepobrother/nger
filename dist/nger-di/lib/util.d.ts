import { Type } from './type';
export declare function stringify(token: any): string;
export declare function getClosureSafeProperty<T>(objWithPropertyToExtract: T): string;
export declare function forwardRef(forwardRefFn: ForwardRefFn): Type<any>;
export interface ForwardRefFn {
    (): any;
}
export declare function resolveForwardRef<T>(type: T): T;
