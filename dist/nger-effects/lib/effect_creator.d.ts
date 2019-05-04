import { Observable } from 'rxjs';
import { Action } from 'nger-store';
import { EffectMetadata } from './models';
export declare function createEffect<R extends Observable<unknown> | ((...args: any[]) => Observable<unknown>)>(source: () => R, options: {
    dispatch: false;
}): R;
export declare function createEffect<T extends Action, R extends Observable<T> | ((...args: any[]) => Observable<T>)>(source: () => R, options?: {
    dispatch: true;
}): R;
export declare function getCreateEffectMetadata<T>(instance: T): EffectMetadata<T>[];
