import { InjectionToken, Type, isType } from 'nger-core';
export type DIString<T> = string & {
    type: T
}
export type IDiToken<T> = Type<T> | InjectionToken<T> | DIString<T>
export interface IDi<T> {
    token: IDiToken<T>;
    factory: () => T;
    value: T;
}

export function register<T>(di: IDi<T>) {

}

export class Injector {
    map: Map<IDiToken<any>, IDi<any>> = new Map();
    constructor(public parent?: Injector) { }

    get<T>(token: Type<T> | InjectionToken<T> | DIString<T>): T | undefined {
        if (token instanceof InjectionToken) {

        } else if (isType(token)) {
            return new token();
        } else { }
    }
}
