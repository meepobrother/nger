import { Injector, Type } from 'nger-di';
import { Subscription } from 'rxjs';
import { ComponentNgElementStrategyFactory } from './component-factory-strategy';
import { NgElementStrategy, NgElementStrategyFactory } from './element-strategy';
import { createCustomEvent, getComponentInputs, getDefaultAttributeToPropertyInputs } from './utils';
export interface NgElementConstructor<P> {
  readonly observedAttributes: string[];
  new(injector: Injector): NgElement & WithProperties<P>;
}
export abstract class NgElement extends HTMLElement {
  protected ngElementStrategy !: NgElementStrategy;
  protected ngElementEventsSubscription: Subscription | null = null;
  abstract attributeChangedCallback(
    attrName: string,
    oldValue: string | null,
    newValue: string,
    namespace?: string
  ): void;
  abstract connectedCallback(): void;
  abstract disconnectedCallback(): void;
}

export type WithProperties<P> = {
  [property in keyof P]: P[property]
};

export interface NgElementConfig {
  injector: Injector;
  strategyFactory?: NgElementStrategyFactory;
}

export function createCustomElement<P>(
  component: Type<any>,
  config: NgElementConfig
): NgElementConstructor<P> {
  const inputs = getComponentInputs(component, config.injector);
  const strategyFactory =
    config.strategyFactory || new ComponentNgElementStrategyFactory(component, config.injector);
  const attributeToPropertyInputs = getDefaultAttributeToPropertyInputs(inputs);
  class NgElementImpl extends NgElement {
    static readonly ['observedAttributes'] = Object.keys(attributeToPropertyInputs);
    constructor(injector?: Injector) {
      super();
      this.ngElementStrategy = strategyFactory.create(injector || config.injector);
    }
    // new
    createdCallback() {
    }
    attachedCallback() { 
    }
    detachedCallback(){
    }
    // 属性变动监控
    attributeChangedCallback(
      attrName: string,
      oldValue: string | null,
      newValue: string,
      namespace?: string
    ): void {
      if (!this.ngElementStrategy) {
        this.ngElementStrategy = strategyFactory.create(config.injector);
      }
      const propName = attributeToPropertyInputs[attrName]!;
      this.ngElementStrategy.setInputValue(propName, newValue);
    }
    // 事件监控
    connectedCallback(): void {
      if (!this.ngElementStrategy) {
        this.ngElementStrategy = strategyFactory.create(config.injector);
      }
      this.ngElementStrategy.connect(this);
      this.ngElementEventsSubscription = this.ngElementStrategy.events.subscribe(e => {
        const customEvent = createCustomEvent(this.ownerDocument!, e.name, e.value);
        this.dispatchEvent(customEvent);
      });
    }
    // 销毁
    disconnectedCallback(): void {
      if (this.ngElementStrategy) {
        this.ngElementStrategy.disconnect();
      }
      if (this.ngElementEventsSubscription) {
        this.ngElementEventsSubscription.unsubscribe();
        this.ngElementEventsSubscription = null;
      }
    }
  }
  inputs.map(({ propName }) => propName).forEach(property => {
    Object.defineProperty(NgElementImpl.prototype, property, {
      get: function () { return this.ngElementStrategy.getInputValue(property); },
      set: function (newValue: any) { this.ngElementStrategy.setInputValue(property, newValue); },
      configurable: true,
      enumerable: true,
    });
  });
  return (NgElementImpl as any) as NgElementConstructor<P>;
}
