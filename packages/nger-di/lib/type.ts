export interface Type<T> extends Function {
    new(...args: any[]): T;
    defaultProps?: any;
}
export function isType<T>(val: any): val is Type<T> {
    return typeof val === 'function'
}
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
export type StaticProvider = ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider;
// static 一共5个Provider 谢了4个is函数 剩余的哪一个是ConstructorProvider
export function isValueProvider(val: StaticProvider): val is ValueProvider {
    return !!(val as ValueProvider).useValue
}
export function isExistingProvider(val: StaticProvider): val is ExistingProvider {
    return !!(val as ExistingProvider).useExisting
}
export function isStaticClassProvider(val: StaticProvider): val is StaticClassProvider {
    return !!(val as StaticClassProvider).useClass
}
export function isFactoryProvider(val: StaticProvider): val is FactoryProvider {
    return !!(val as FactoryProvider).useFactory
}
// ConstructorProvider

export interface ClassSansProvider {
    useClass: Type<any>;
}
export interface TypeProvider extends Type<any> { }

export interface ClassProvider extends ClassSansProvider {
    provide: any;
    multi?: boolean;
}

// StaticProvider and Provider
// FactoryProvider and FactoryProvider
// ConstructorProvider and ConstructorProvider
// StaticClassProvider and null  
// ExistingProvider and ExistingProvider
// ValueProvider and ValueProvider
// null and TypeProvider
// null and ClassProvider
export type Provider = TypeProvider | ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider;
// provider 一共6个
// TypeProvider 
export function isTypeProvider(val: any): val is TypeProvider {
    return typeof val === 'function'
}
// ClassProvider 
export function isClassProvider(val: any): val is ClassProvider {
    return !!(val as ClassProvider).useClass
}
// TypeProvider 等价于ClassProvider
// [Type] = [{provide: Type,useClass: Type}]

// 将Provider转化为StaticProvider
// TypeProvider|| ClassProvider
// TypeProvider -> StaticClassProvider
// ClassProvider-> StaticClassProvider

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

export type AllProvider = Provider | StaticProvider;

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

export enum InjectFlags {
    // TODO(alxhub): make this 'const' when ngc no longer writes exports of it into ngfactory files.
    /** Check self and check parent injector if needed */
    Default = 0b0000,
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    Host = 0b0001,
    /** Don't ascend to ancestors of the node requesting injection. */
    Self = 0b0010,
    /** Skip the node that is requesting injection. */
    SkipSelf = 0b0100,
    /** Inject `defaultValue` instead if token not found. */
    Optional = 0b1000
}

export enum OptionFlags {
    Optional = 1 << 0,
    CheckSelf = 1 << 1,
    CheckParent = 1 << 2,
    Default = CheckSelf | CheckParent
}