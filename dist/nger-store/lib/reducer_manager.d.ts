import { OnDestroy } from 'nger-core';
import { Provider } from 'nger-di';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionsSubject } from './actions_subject';
import { ActionReducer, ActionReducerFactory, ActionReducerMap, StoreFeature } from './models';
export declare abstract class ReducerObservable extends Observable<ActionReducer<any, any>> {
}
export declare abstract class ReducerManagerDispatcher extends ActionsSubject {
}
export declare const UPDATE: "@ngrx/store/update-reducers";
export declare class ReducerManager extends BehaviorSubject<ActionReducer<any, any>> implements OnDestroy {
    private dispatcher;
    private initialState;
    private reducers;
    private reducerFactory;
    constructor(dispatcher: ReducerManagerDispatcher, initialState: any, reducers: ActionReducerMap<any, any>, reducerFactory: ActionReducerFactory<any, any>);
    addFeature(feature: StoreFeature<any, any>): void;
    addFeatures(features: StoreFeature<any, any>[]): void;
    removeFeature(feature: StoreFeature<any, any>): void;
    removeFeatures(features: StoreFeature<any, any>[]): void;
    addReducer(key: string, reducer: ActionReducer<any, any>): void;
    addReducers(reducers: {
        [key: string]: ActionReducer<any, any>;
    }): void;
    removeReducer(featureKey: string): void;
    removeReducers(featureKeys: string[]): void;
    private updateReducers;
    ngOnDestroy(): void;
}
export declare const REDUCER_MANAGER_PROVIDERS: Provider[];
