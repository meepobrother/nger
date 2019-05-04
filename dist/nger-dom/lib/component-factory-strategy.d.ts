/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentFactory, Type } from 'nger-core';
import { Injector } from 'nger-di';
import { Observable } from 'rxjs';
import { NgElementStrategy, NgElementStrategyEvent, NgElementStrategyFactory } from './element-strategy';
/**
 * Factory that creates new ComponentNgElementStrategy instance. Gets the component factory with the
 * constructor's injector's factory resolver and passes that factory to each strategy.
 *
 * @publicApi
 */
export declare class ComponentNgElementStrategyFactory<T> implements NgElementStrategyFactory {
    private component;
    private injector;
    componentFactory: ComponentFactory<T>;
    constructor(component: Type<T>, injector: Injector);
    create(injector: Injector): ComponentNgElementStrategy<T>;
}
/**
 * Creates and destroys a component ref using a component factory and handles change detection
 * in response to input changes.
 *
 * @publicApi
 */
export declare class ComponentNgElementStrategy<T> implements NgElementStrategy {
    private componentFactory;
    private injector;
    events: Observable<NgElementStrategyEvent>;
    private componentRef;
    private inputChanges;
    private implementsOnChanges;
    private scheduledChangeDetectionFn;
    private scheduledDestroyFn;
    private readonly initialInputValues;
    private readonly uninitializedInputs;
    constructor(componentFactory: ComponentFactory<T>, injector: Injector);
    /**
     * Initializes a new component if one has not yet been created and cancels any scheduled
     * destruction.
     */
    connect(element: HTMLElement): void;
    /**
     * Schedules the component to be destroyed after some small delay in case the element is just
     * being moved across the DOM.
     */
    disconnect(): void;
    /**
     * Returns the component property value. If the component has not yet been created, the value is
     * retrieved from the cached initialization values.
     */
    getInputValue(property: string): any;
    /**
     * Sets the input value for the property. If the component has not yet been created, the value is
     * cached and set when the component is created.
     */
    setInputValue(property: string, value: any): void;
    /**
     * Creates a new component through the component factory with the provided element host and
     * sets up its initial inputs, listens for outputs changes, and runs an initial change detection.
     */
    protected initializeComponent(element: HTMLElement): void;
    /** Set any stored initial inputs on the component's properties. */
    protected initializeInputs(): void;
    /** Sets up listeners for the component's outputs so that the events stream emits the events. */
    protected initializeOutputs(): void;
    /** Calls ngOnChanges with all the inputs that have changed since the last call. */
    protected callNgOnChanges(): void;
    /**
     * Schedules change detection to run on the component.
     * Ignores subsequent calls if already scheduled.
     */
    protected scheduleDetectChanges(): void;
    /**
     * Records input changes so that the component receives SimpleChanges in its onChanges function.
     */
    protected recordInputChange(property: string, currentValue: any): void;
    /** Runs change detection on the component. */
    protected detectChanges(): void;
}
