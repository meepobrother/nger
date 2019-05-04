/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from 'nger-core';
import { Injector } from 'nger-di';
/**
 * Provide methods for scheduling the execution of a callback.
 */
export declare const scheduler: {
    /**
     * Schedule a callback to be called after some delay.
     *
     * Returns a function that when executed will cancel the scheduled function.
     */
    schedule(taskFn: () => void, delay: number): () => void;
    /**
     * Schedule a callback to be called before the next render.
     * (If `window.requestAnimationFrame()` is not available, use `scheduler.schedule()` instead.)
     *
     * Returns a function that when executed will cancel the scheduled function.
     */
    scheduleBeforeRender(taskFn: () => void): () => void;
};
/**
 * Convert a camelCased string to kebab-cased.
 */
export declare function camelToDashCase(input: string): string;
/**
 * Create a `CustomEvent` (even on browsers where `CustomEvent` is not a constructor).
 */
export declare function createCustomEvent(doc: Document, name: string, detail: any): CustomEvent;
/**
 * Check whether the input is an `Element`.
 */
export declare function isElement(node: Node | null): node is Element;
/**
 * Check whether the input is a function.
 */
export declare function isFunction(value: any): value is Function;
/**
 * Convert a kebab-cased string to camelCased.
 */
export declare function kebabToCamelCase(input: string): string;
/**
 * Check whether an `Element` matches a CSS selector.
 */
export declare function matchesSelector(element: Element, selector: string): boolean;
/**
 * Test two values for strict equality, accounting for the fact that `NaN !== NaN`.
 */
export declare function strictEquals(value1: any, value2: any): boolean;
/** Gets a map of default set of attributes to observe and the properties they affect. */
export declare function getDefaultAttributeToPropertyInputs(inputs: {
    propName: string;
    templateName: string;
}[]): {
    [key: string]: string;
};
/**
 * Gets a component's set of inputs. Uses the injector to get the component factory where the inputs
 * are defined.
 */
export declare function getComponentInputs(component: Type<any>, injector: Injector): {
    propName: string;
    templateName: string;
}[];
