import { Type, Injector, InjectionToken } from 'nger-di';
import { NgModuleRef } from './ng_module_ref';
import { ComponentRef } from './component_ref';
import { TypeContext } from 'ims-decorator';
import { ComponentClassAst, ComponentOptions } from '../decorators/component';
export declare const ComponentTemplateToken: InjectionToken<string>;
export declare const ComponentStyleToken: InjectionToken<string>;
export declare const ComponentPropToken: InjectionToken<object>;
export declare const StyleRef: InjectionToken<HTMLStyleElement>;
export interface ComponentCreator {
    (_context: TypeContext): any;
}
export declare const ComponentCreator: InjectionToken<ComponentCreator[]>;
export declare class ComponentFactory<C> {
    private _context;
    readonly selector: string;
    readonly componentType: Type<C>;
    readonly ngContentSelectors: string[];
    readonly inputs: {
        propName: string;
        templateName: string;
    }[];
    readonly outputs: {
        propName: string;
        templateName: string;
    }[];
    readonly context: TypeContext;
    readonly def: ComponentOptions;
    readonly type: string;
    private _def;
    private _selector;
    private _componentType;
    private _ngContentSelectors;
    private _inputs;
    private _outputs;
    private _type;
    constructor(_context: TypeContext);
    handlerComponent(cls: ComponentClassAst): void;
    create<C>(injector: Injector, ngModule?: NgModuleRef<any>): ComponentRef<C>;
}
