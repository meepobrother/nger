import { Injector, Type } from 'nger-di';
import { Subscription } from 'rxjs';
import { NgElementStrategy, NgElementStrategyFactory } from './element-strategy';
export interface NgElementConstructor<P> {
    readonly observedAttributes: string[];
    new (injector: Injector): NgElement & WithProperties<P>;
}
export declare abstract class NgElement extends HTMLElement {
    protected ngElementStrategy: NgElementStrategy;
    protected ngElementEventsSubscription: Subscription | null;
    abstract attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string, namespace?: string): void;
    abstract connectedCallback(): void;
    abstract disconnectedCallback(): void;
}
export declare type WithProperties<P> = {
    [property in keyof P]: P[property];
};
export interface NgElementConfig {
    injector: Injector;
    strategyFactory?: NgElementStrategyFactory;
}
export declare function createCustomElement<P>(component: Type<any>, config: NgElementConfig): NgElementConstructor<P>;
