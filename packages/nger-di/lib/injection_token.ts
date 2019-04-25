import { Type } from './type'
export class InjectionToken<T> {
    readonly ngMetadataName = 'InjectionToken';
    readonly name: string;
    constructor(
        protected _desc: string,
        protected options?: {
            providedIn?: Type<any> | 'root' | null,
            factory: () => T
        }
    ) {
        this.name = this._desc;
        if (typeof options == 'number') {
            (this as any).__NG_ELEMENT_ID__ = options;
        } else if (options !== undefined) { }
    }
    toString(): string { return `InjectionToken ${this._desc}`; }
}