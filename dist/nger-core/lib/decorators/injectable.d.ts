import { ClassContext, ClassAst } from 'ims-decorator';
export declare const InjectableMetadataKey = "InjectableMetadataKey";
import { Type, ValueSansProvider, ExistingSansProvider, StaticClassSansProvider, ConstructorSansProvider, FactorySansProvider, ClassSansProvider } from 'nger-di';
export declare type InjectableProvider = ValueSansProvider | ExistingSansProvider | StaticClassSansProvider | ConstructorSansProvider | FactorySansProvider | ClassSansProvider;
export declare type InjectableOptions = {
    providedIn?: Type<any> | 'root' | null;
} & InjectableProvider;
export declare const Injectable: {
    (opt?: InjectableOptions): any;
    (opt?: InjectableOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: InjectableOptions): any;
};
export declare class InjectableClassAst extends ClassContext<InjectableOptions> {
}
export declare function isInjectableClassAst(ast: ClassAst): ast is ClassAst<InjectableOptions>;
