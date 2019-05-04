import { TypeContext, Type } from 'ims-decorator';
import { Provider, StaticProvider } from 'nger-di';
export declare function providerToStaticProvider(provider: Provider, context: TypeContext): StaticProvider;
export declare function clearCache(): void;
export declare function getModules(): Set<any>;
export declare function createTypeProvider(imp: Type<any>, context: TypeContext): {
    provide: Type<any>;
    useFactory: (...params: any[]) => any;
    deps: any[];
};
export declare function createStaticProvider(context: TypeContext, providers?: StaticProvider[]): StaticProvider[];
export declare function handlerTypeContextToParams(dec: TypeContext): any[];
