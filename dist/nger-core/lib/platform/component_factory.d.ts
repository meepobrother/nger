import { Type, Injector, InjectionToken } from 'nger-di';
import { NgModuleRef } from './ng_module_ref';
import { ComponentRef } from './component_ref';
import { TypeContext } from 'ims-decorator';
import { ComponentClassAst, ComponentOptions } from '../decorators/component';
export declare type Render = (injector: Injector) => <T>(type: any, props: any, ...children: any[]) => T;
export interface NgerTemplate {
    references: any[];
    attributes: any[];
    inputs: any[];
    outputs: any[];
    variables: any[];
}
export interface NgerContent {
    selector: string;
    attributes: any[];
}
export declare class NgerRender {
    h: (type: any, props: any, ...children: any[]) => any;
    element: (name: string, attribute: any, ...children: any[]) => any;
    template: (tpl: NgerTemplate, ...children: any[]) => any;
    content: (cfg: NgerContent) => any;
    textAttribute: (cfg: any) => any;
    boundAttribute: (cfg: any) => any;
    boundEvent: (cfg: any) => any;
    text: (txt: string) => any;
    boundText: (attr: string) => any;
    icu: (arg: any) => any;
    constructor();
    create(ref: ComponentRef<any>): any;
}
export declare abstract class NgerRenderFactory {
    abstract create(instance: any): NgerRender;
}
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
