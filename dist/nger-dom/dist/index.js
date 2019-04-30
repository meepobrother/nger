/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const nger_di_1 = require("nger-di");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const extract_projectable_nodes_1 = require("./extract-projectable-nodes");
const utils_1 = require("./utils");
/** Time in milliseconds to wait before destroying the component ref when disconnected. */
const DESTROY_DELAY = 10;
/**
 * Factory that creates new ComponentNgElementStrategy instance. Gets the component factory with the
 * constructor's injector's factory resolver and passes that factory to each strategy.
 *
 * @publicApi
 */
class ComponentNgElementStrategyFactory {
    constructor(component, injector) {
        this.component = component;
        this.injector = injector;
        this.componentFactory =
            injector.get(nger_core_1.ComponentFactoryResolver).resolveComponentFactory(component);
    }
    create(injector) {
        return new ComponentNgElementStrategy(this.componentFactory, injector);
    }
}
exports.ComponentNgElementStrategyFactory = ComponentNgElementStrategyFactory;
/**
 * Creates and destroys a component ref using a component factory and handles change detection
 * in response to input changes.
 *
 * @publicApi
 */
class ComponentNgElementStrategy {
    constructor(componentFactory, injector) {
        this.componentFactory = componentFactory;
        this.injector = injector;
        this.inputChanges = null;
        this.implementsOnChanges = false;
        this.scheduledChangeDetectionFn = null;
        this.scheduledDestroyFn = null;
        this.initialInputValues = new Map();
        this.uninitializedInputs = new Set();
    }
    /**
     * Initializes a new component if one has not yet been created and cancels any scheduled
     * destruction.
     */
    connect(element) {
        // If the element is marked to be destroyed, cancel the task since the component was reconnected
        if (this.scheduledDestroyFn !== null) {
            this.scheduledDestroyFn();
            this.scheduledDestroyFn = null;
            return;
        }
        if (!this.componentRef) {
            this.initializeComponent(element);
        }
    }
    /**
     * Schedules the component to be destroyed after some small delay in case the element is just
     * being moved across the DOM.
     */
    disconnect() {
        // Return if there is no componentRef or the component is already scheduled for destruction
        if (!this.componentRef || this.scheduledDestroyFn !== null) {
            return;
        }
        // Schedule the component to be destroyed after a small timeout in case it is being
        // moved elsewhere in the DOM
        this.scheduledDestroyFn = utils_1.scheduler.schedule(() => {
            if (this.componentRef) {
                this.componentRef.destroy();
                this.componentRef = null;
            }
        }, DESTROY_DELAY);
    }
    /**
     * Returns the component property value. If the component has not yet been created, the value is
     * retrieved from the cached initialization values.
     */
    getInputValue(property) {
        if (!this.componentRef) {
            return this.initialInputValues.get(property);
        }
        return this.componentRef.instance[property];
    }
    /**
     * Sets the input value for the property. If the component has not yet been created, the value is
     * cached and set when the component is created.
     */
    setInputValue(property, value) {
        if (utils_1.strictEquals(value, this.getInputValue(property))) {
            return;
        }
        if (!this.componentRef) {
            this.initialInputValues.set(property, value);
            return;
        }
        this.recordInputChange(property, value);
        this.componentRef.instance[property] = value;
        this.scheduleDetectChanges();
    }
    /**
     * Creates a new component through the component factory with the provided element host and
     * sets up its initial inputs, listens for outputs changes, and runs an initial change detection.
     */
    initializeComponent(element) {
        const childInjector = nger_di_1.Injector.create({ providers: [], parent: this.injector });
        // 项目node elements
        const projectableNodes = extract_projectable_nodes_1.extractProjectableNodes(element, this.componentFactory.ngContentSelectors);
        // element
        this.componentRef = this.componentFactory.create(childInjector);
        // host view
        this.implementsOnChanges =
            utils_1.isFunction(this.componentRef.instance.ngOnChanges);
        this.initializeInputs();
        this.initializeOutputs();
        this.detectChanges();
        const applicationRef = this.injector.get(nger_core_1.ApplicationRef);
        applicationRef.attachView(this.componentRef);
    }
    /** Set any stored initial inputs on the component's properties. */
    initializeInputs() {
        this.componentFactory.inputs.forEach(({ propName }) => {
            const initialValue = this.initialInputValues.get(propName);
            if (initialValue) {
                this.setInputValue(propName, initialValue);
            }
            else {
                this.uninitializedInputs.add(propName);
            }
        });
        this.initialInputValues.clear();
    }
    /** Sets up listeners for the component's outputs so that the events stream emits the events. */
    initializeOutputs() {
        const eventEmitters = this.componentFactory.outputs.map(({ propName, templateName }) => {
            const emitter = this.componentRef.instance[propName];
            return emitter.pipe(operators_1.map((value) => ({ name: templateName, value })));
        });
        this.events = rxjs_1.merge(...eventEmitters);
    }
    /** Calls ngOnChanges with all the inputs that have changed since the last call. */
    callNgOnChanges() {
        if (!this.implementsOnChanges || this.inputChanges === null) {
            return;
        }
        const inputChanges = this.inputChanges;
        this.inputChanges = null;
        this.componentRef.instance.ngOnChanges(inputChanges);
    }
    /**
     * Schedules change detection to run on the component.
     * Ignores subsequent calls if already scheduled.
     */
    scheduleDetectChanges() {
        if (this.scheduledChangeDetectionFn) {
            return;
        }
        this.scheduledChangeDetectionFn = utils_1.scheduler.scheduleBeforeRender(() => {
            this.scheduledChangeDetectionFn = null;
            this.detectChanges();
        });
    }
    /**
     * Records input changes so that the component receives SimpleChanges in its onChanges function.
     */
    recordInputChange(property, currentValue) {
        // Do not record the change if the component does not implement `OnChanges`.
        if (this.componentRef && !this.implementsOnChanges) {
            return;
        }
        if (this.inputChanges === null) {
            this.inputChanges = {};
        }
        // If there already is a change, modify the current value to match but leave the values for
        // previousValue and isFirstChange.
        const pendingChange = this.inputChanges[property];
        if (pendingChange) {
            pendingChange.currentValue = currentValue;
            return;
        }
        const isFirstChange = this.uninitializedInputs.has(property);
        this.uninitializedInputs.delete(property);
        const previousValue = isFirstChange ? undefined : this.getInputValue(property);
        this.inputChanges[property] = new nger_core_1.SimpleChange(previousValue, currentValue, isFirstChange);
    }
    /** Runs change detection on the component. */
    detectChanges() {
        if (!this.componentRef) {
            return;
        }
        this.callNgOnChanges();
        this.componentRef.changeDetectorRef.detectChanges();
    }
}
exports.ComponentNgElementStrategy = ComponentNgElementStrategy;

Object.defineProperty(exports, "__esModule", { value: true });
const component_factory_strategy_1 = require("./component-factory-strategy");
const utils_1 = require("./utils");
class NgElement extends HTMLElement {
    constructor() {
        super(...arguments);
        // 事件监听
        this.ngElementEventsSubscription = null;
    }
}
exports.NgElement = NgElement;
function createCustomElement(component, config) {
    const inputs = utils_1.getComponentInputs(component, config.injector);
    const strategyFactory = config.strategyFactory || new component_factory_strategy_1.ComponentNgElementStrategyFactory(component, config.injector);
    const attributeToPropertyInputs = utils_1.getDefaultAttributeToPropertyInputs(inputs);
    class NgElementImpl extends NgElement {
        constructor(injector) {
            super();
            this.ngElementStrategy = strategyFactory.create(injector || config.injector);
        }
        attributeChangedCallback(attrName, oldValue, newValue, namespace) {
            if (!this.ngElementStrategy) {
                this.ngElementStrategy = strategyFactory.create(config.injector);
            }
            const propName = attributeToPropertyInputs[attrName];
            this.ngElementStrategy.setInputValue(propName, newValue);
        }
        connectedCallback() {
            if (!this.ngElementStrategy) {
                this.ngElementStrategy = strategyFactory.create(config.injector);
            }
            this.ngElementStrategy.connect(this);
            this.ngElementEventsSubscription = this.ngElementStrategy.events.subscribe(e => {
                const customEvent = utils_1.createCustomEvent(this.ownerDocument, e.name, e.value);
                this.dispatchEvent(customEvent);
            });
        }
        disconnectedCallback() {
            if (this.ngElementStrategy) {
                this.ngElementStrategy.disconnect();
            }
            if (this.ngElementEventsSubscription) {
                this.ngElementEventsSubscription.unsubscribe();
                this.ngElementEventsSubscription = null;
            }
        }
    }
    NgElementImpl['observedAttributes'] = Object.keys(attributeToPropertyInputs);
    inputs.map(({ propName }) => propName).forEach(property => {
        Object.defineProperty(NgElementImpl.prototype, property, {
            get: function () { return this.ngElementStrategy.getInputValue(property); },
            set: function (newValue) { this.ngElementStrategy.setInputValue(property, newValue); },
            configurable: true,
            enumerable: true,
        });
    });
    return NgElementImpl;
}
exports.createCustomElement = createCustomElement;

Object.defineProperty(exports, "__esModule", { value: true });

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// NOTE: This is a (slightly improved) version of what is used in ngUpgrade's
//       `DowngradeComponentAdapter`.
// TODO(gkalpak): Investigate if it makes sense to share the code.
const utils_1 = require("./utils");
function extractProjectableNodes(host, ngContentSelectors) {
    const nodes = host.childNodes;
    const projectableNodes = ngContentSelectors.map(() => []);
    let wildcardIndex = -1;
    ngContentSelectors.some((selector, i) => {
        if (selector === '*') {
            wildcardIndex = i;
            return true;
        }
        return false;
    });
    for (let i = 0, ii = nodes.length; i < ii; ++i) {
        const node = nodes[i];
        const ngContentIndex = findMatchingIndex(node, ngContentSelectors, wildcardIndex);
        if (ngContentIndex !== -1) {
            projectableNodes[ngContentIndex].push(node);
        }
    }
    return projectableNodes;
}
exports.extractProjectableNodes = extractProjectableNodes;
function findMatchingIndex(node, selectors, defaultIndex) {
    let matchingIndex = defaultIndex;
    if (utils_1.isElement(node)) {
        selectors.some((selector, i) => {
            if ((selector !== '*') && utils_1.matchesSelector(node, selector)) {
                matchingIndex = i;
                return true;
            }
            return false;
        });
    }
    return matchingIndex;
}

Object.defineProperty(exports, "__esModule", { value: true });
var create_custom_element_1 = require("./create-custom-element");
exports.NgElement = create_custom_element_1.NgElement;
exports.createCustomElement = create_custom_element_1.createCustomElement;

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const nger_core_1 = require("nger-core");
const elProto = Element.prototype;
const matches = elProto.matches || elProto.matchesSelector || elProto.mozMatchesSelector ||
    elProto.msMatchesSelector || elProto.oMatchesSelector || elProto.webkitMatchesSelector;
/**
 * Provide methods for scheduling the execution of a callback.
 */
exports.scheduler = {
    /**
     * Schedule a callback to be called after some delay.
     *
     * Returns a function that when executed will cancel the scheduled function.
     */
    schedule(taskFn, delay) { const id = setTimeout(taskFn, delay); return () => clearTimeout(id); },
    /**
     * Schedule a callback to be called before the next render.
     * (If `window.requestAnimationFrame()` is not available, use `scheduler.schedule()` instead.)
     *
     * Returns a function that when executed will cancel the scheduled function.
     */
    scheduleBeforeRender(taskFn) {
        // TODO(gkalpak): Implement a better way of accessing `requestAnimationFrame()`
        //                (e.g. accounting for vendor prefix, SSR-compatibility, etc).
        if (typeof window === 'undefined') {
            return exports.scheduler.schedule(taskFn, 0);
        }
        if (typeof window.requestAnimationFrame === 'undefined') {
            const frameMs = 16;
            return exports.scheduler.schedule(taskFn, frameMs);
        }
        const id = window.requestAnimationFrame(taskFn);
        return () => window.cancelAnimationFrame(id);
    },
};
/**
 * Convert a camelCased string to kebab-cased.
 */
function camelToDashCase(input) {
    return input.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);
}
exports.camelToDashCase = camelToDashCase;
/**
 * Create a `CustomEvent` (even on browsers where `CustomEvent` is not a constructor).
 */
function createCustomEvent(doc, name, detail) {
    const bubbles = false;
    const cancelable = false;
    // On IE9-11, `CustomEvent` is not a constructor.
    if (typeof CustomEvent !== 'function') {
        const event = doc.createEvent('CustomEvent');
        event.initCustomEvent(name, bubbles, cancelable, detail);
        return event;
    }
    return new CustomEvent(name, { bubbles, cancelable, detail });
}
exports.createCustomEvent = createCustomEvent;
/**
 * Check whether the input is an `Element`.
 */
function isElement(node) {
    return !!node && node.nodeType === Node.ELEMENT_NODE;
}
exports.isElement = isElement;
/**
 * Check whether the input is a function.
 */
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
/**
 * Convert a kebab-cased string to camelCased.
 */
function kebabToCamelCase(input) {
    return input.replace(/-([a-z\d])/g, (_, char) => char.toUpperCase());
}
exports.kebabToCamelCase = kebabToCamelCase;
/**
 * Check whether an `Element` matches a CSS selector.
 */
function matchesSelector(element, selector) {
    return matches.call(element, selector);
}
exports.matchesSelector = matchesSelector;
/**
 * Test two values for strict equality, accounting for the fact that `NaN !== NaN`.
 */
function strictEquals(value1, value2) {
    return value1 === value2 || (value1 !== value1 && value2 !== value2);
}
exports.strictEquals = strictEquals;
/** Gets a map of default set of attributes to observe and the properties they affect. */
function getDefaultAttributeToPropertyInputs(inputs) {
    const attributeToPropertyInputs = {};
    inputs.forEach(({ propName, templateName }) => {
        attributeToPropertyInputs[camelToDashCase(templateName)] = propName;
    });
    return attributeToPropertyInputs;
}
exports.getDefaultAttributeToPropertyInputs = getDefaultAttributeToPropertyInputs;
/**
 * Gets a component's set of inputs. Uses the injector to get the component factory where the inputs
 * are defined.
 */
function getComponentInputs(component, injector) {
    const componentFactoryResolver = injector.get(nger_core_1.ComponentFactoryResolver);
    const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
    return componentFactory.inputs;
}
exports.getComponentInputs = getComponentInputs;
