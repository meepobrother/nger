import { ClassContext, ClassAst, TypeContext } from 'ims-decorator';
export declare const NgModuleMetadataKey = "NgModuleMetadataKey";
import { Provider, Type, ModuleWithProviders, SchemaMetadata, InjectionToken } from 'nger-di';
export interface NgModuleOptions {
    providers?: Provider[];
    declarations?: Array<Type<any>>;
    imports?: Array<Type<any> | ModuleWithProviders<any>>;
    exports?: Array<Type<any>>;
    entryComponents?: Array<Type<any>>;
    bootstrap?: Array<Type<any>>;
    schemas?: Array<SchemaMetadata>;
    id?: string;
    jit?: true;
    fileName?: string;
}
export declare const NgModule: {
    (opt?: NgModuleOptions): any;
    (opt?: NgModuleOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: NgModuleOptions): any;
};
export declare const APP_ALLREADY: InjectionToken<(() => void)[]>;
export declare class NgModuleClassAst extends ClassContext<NgModuleOptions> {
    declarations: TypeContext[];
    constructor(ast: any, context: any);
}
export declare function isNgModuleClassAst(ast: ClassAst): ast is ClassAst<NgModuleOptions>;
