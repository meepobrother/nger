"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_factory_strategy_1 = require("./component-factory-strategy");
const utils_1 = require("./utils");
class NgElement extends HTMLElement {
    constructor() {
        super(...arguments);
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
        // new
        createdCallback() {
        }
        attachedCallback() {
        }
        detachedCallback() {
        }
        // 属性变动监控
        attributeChangedCallback(attrName, oldValue, newValue, namespace) {
            if (!this.ngElementStrategy) {
                this.ngElementStrategy = strategyFactory.create(config.injector);
            }
            const propName = attributeToPropertyInputs[attrName];
            this.ngElementStrategy.setInputValue(propName, newValue);
        }
        // 事件监控
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
        // 销毁
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
