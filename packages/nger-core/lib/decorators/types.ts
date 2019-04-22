export interface Type<T> extends Function {
    new(...args: any[]): T;
}
export interface Provider { }
export interface ModuleWithProviders<T> { }
export interface SchemaMetadata { }

export enum ChangeDetectionStrategy {
    OnPush = 0,
    Default = 1
}
export enum ViewEncapsulation {
    Emulated = 0,
    Native = 1,
    None = 2,
    ShadowDom = 3
}
import { Observable } from 'rxjs';
export abstract class QueryList<T> {
    readonly dirty = true;
    private _results;
    readonly changes: Observable<any>;
    readonly length: number;
    readonly first: T;
    readonly last: T;
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     */
    abstract map<U>(fn: (item: T, index: number, array: T[]) => U): U[];
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     */
    abstract filter(fn: (item: T, index: number, array: T[]) => boolean): T[];
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     */
    abstract find(fn: (item: T, index: number, array: T[]) => boolean): T | undefined;
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     */
    abstract reduce<U>(fn: (prevValue: U, curValue: T, curIndex: number, array: T[]) => U, init: U): U;
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     */
    abstract forEach(fn: (item: T, index: number, array: T[]) => void): void;
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     */
    abstract some(fn: (value: T, index: number, array: T[]) => boolean): boolean;
    abstract toArray(): T[];
    abstract toString(): string;
    abstract reset(res: Array<T | any[]>): void;
    abstract notifyOnChanges(): void;
    /** internal */
    abstract setDirty(): void;
    /** internal */
    abstract destroy(): void;
}
