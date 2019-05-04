import { Type } from './type';
export declare class InjectionToken<T> {
    protected _desc: string;
    protected options?: {
        providedIn?: Type<any> | 'root' | null;
        factory: () => T;
    };
    readonly ngMetadataName = "InjectionToken";
    readonly name: string;
    constructor(_desc: string, options?: {
        providedIn?: Type<any> | 'root' | null;
        factory: () => T;
    });
    toString(): string;
}
