export interface Type<T> extends Function {
    new (...args: any[]): T;
    defaultProps?: any;
}
export declare function isType<T>(val: any): val is Type<T>;
export interface ValueSansProvider {
    useValue: any;
}
export interface ValueProvider extends ValueSansProvider {
    provide: any;
    multi?: boolean;
}
export interface StaticClassSansProvider {
    useClass: Type<any>;
    deps: any[];
}
export interface StaticClassProvider extends StaticClassSansProvider {
    provide: any;
    multi?: boolean;
}
export interface ConstructorSansProvider {
    deps?: any[];
}
export interface ConstructorProvider extends ConstructorSansProvider {
    provide: Type<any>;
    multi?: boolean;
}
export interface ExistingSansProvider {
    useExisting: any;
}
export interface ExistingProvider extends ExistingSansProvider {
    provide: any;
    multi?: boolean;
}
export interface FactorySansProvider {
    useFactory: Function;
    deps?: any[];
}
export interface FactoryProvider extends FactorySansProvider {
    provide: any;
    multi?: boolean;
}
export declare type StaticProvider = ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider;
export declare function isValueProvider(val: StaticProvider): val is ValueProvider;
export declare function isExistingProvider(val: StaticProvider): val is ExistingProvider;
export declare function isStaticClassProvider(val: StaticProvider): val is StaticClassProvider;
export declare function isFactoryProvider(val: StaticProvider): val is FactoryProvider;
export interface ClassSansProvider {
    useClass: Type<any>;
}
export interface TypeProvider extends Type<any> {
}
export interface ClassProvider extends ClassSansProvider {
    provide: any;
    multi?: boolean;
}
export declare type Provider = TypeProvider | ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider;
export declare function isTypeProvider(val: any): val is TypeProvider;
export declare function isClassProvider(val: any): val is ClassProvider;
/**
 * TypeProvider
 * providers:[
 *  ImsDemo
 * ]
 * ->{
 *      provide: ImsDemo,
 *      useClass: ImsDemo,
 *      eps: any[],
 *      multi: false
 * }
 */
/**
 * ClassProvider
 * providers: [
 *     {
 *         provide: ImsDemo,
 *         useClass: ImsDemo,
 *         multi: false
 *     }
 * ]
 * ->
 * ->{
*      provide: ImsDemo,
*      useClass: ImsDemo,
*      deps: any[], // 只需要生成uerClass相应的deps
*      multi: false
* }
 */
export declare type AllProvider = Provider | StaticProvider;
export interface SchemaMetadata {
    name: string;
}
export interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers: Provider[];
}
export interface ModuleWithDeclarations<T = any> {
    ngModule: Type<T>;
    providers: Provider[];
}
export declare enum InjectFlags {
    /** Check self and check parent injector if needed */
    Default = 0,
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    Host = 1,
    /** Don't ascend to ancestors of the node requesting injection. */
    Self = 2,
    /** Skip the node that is requesting injection. */
    SkipSelf = 4,
    /** Inject `defaultValue` instead if token not found. */
    Optional = 8
}
export declare enum OptionFlags {
    Optional = 1,
    CheckSelf = 2,
    CheckParent = 4,
    Default = 6
}
