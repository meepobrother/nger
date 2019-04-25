import { makeDecorator, ClassContext, ClassAst, TypeContext, ConstructorContext, isType } from 'ims-decorator';
export const NgModuleMetadataKey = 'NgModuleMetadataKey';
import { InjectConstructorAst, InjectMetadataKey, InjectPropertyAst } from './inject'
import { Provider, Type, ModuleWithProviders, SchemaMetadata, Injector } from 'nger-di';
import { isTypeProvider, isClassProvider, InjectFlags } from 'nger-di';
import { InjectionToken, StaticClassProvider, FactoryProvider } from 'nger-di';
import { HostConstructorAst } from './host';
import { SkipSelfConstructorAst } from './skip-self';
import { SelfConstructorAst } from './self';
import { OptionalConstructorAst } from './optional';
export interface NgModuleOptions {
    providers?: Provider[];
    declarations?: Array<Type<any>>;
    imports?: Array<Type<any> | ModuleWithProviders<{}>>;
    exports?: Array<Type<any>>;
    entryComponents?: Array<Type<any>>;
    // 这里是启动组件 也就是首页 前端有用
    bootstrap?: Array<Type<any>>;
    schemas?: Array<SchemaMetadata>;
    id?: string;
    jit?: true;
}
export const NgModule = makeDecorator<NgModuleOptions>(NgModuleMetadataKey);

function handlerConstructorContext(deps: any[], ast: ConstructorContext<any>) {
    deps[ast.ast.parameterIndex] = deps[ast.ast.parameterIndex] || [];
    // 构造函数装饰器 这里就要判断了 目的是拿到token即可
    // 如果是Inject 那就是inject的target
    if (ast instanceof InjectConstructorAst) {
        deps[ast.ast.parameterIndex].push(ast.ast.metadataDef.token || ast.ast.parameterType)
    }
    if (ast instanceof HostConstructorAst) {
        deps[ast.ast.parameterIndex].push(InjectFlags.Host)
    }
    if (ast instanceof SkipSelfConstructorAst) {
        deps[ast.ast.parameterIndex].push(InjectFlags.SkipSelf)
    }
    if (ast instanceof SelfConstructorAst) {
        deps[ast.ast.parameterIndex].push(InjectFlags.Self)
    }
    if (ast instanceof OptionalConstructorAst) {
        deps[ast.ast.parameterIndex].push(InjectFlags.Optional)
    }
}
function handlerTypeContextToParams(dec: TypeContext) {
    const deps = new Array(dec.paramsLength);
    dec.getConstructor().map(ast => {
        handlerConstructorContext(deps, ast)
    });
    dec.paramsTypes && dec.paramsTypes.map((par, index) => {
        if (!deps[index]) deps[index] = par;
    });
    // 还要找到属性的 不赋值
    return deps;
}
export const APP_INITIALIZER = new InjectionToken<(() => void)[]>(`APP_INITIALIZER`);
export const APP_ALLREADY = new InjectionToken<(() => void)[]>(`APP_ALLREADY`);
const hasInjectedTarget = new Set();
function setAppInitializer(injector: Injector, dec: TypeContext) {
    if (hasInjectedTarget.has(dec.target)) return;
    hasInjectedTarget.add(dec.target);
    injector.setStatic([{
        provide: APP_INITIALIZER,
        useFactory: (injector: Injector) => {
            return () => {
                const injects = dec.getProperty(InjectMetadataKey) as InjectPropertyAst[];
                injects.map(inject => {
                    const { metadataDef, propertyKey, propertyType } = inject.ast;
                    dec.instance[propertyKey] = injector.get(metadataDef.token || propertyType)
                });
            }
        },
        deps: [Injector],
        multi: true
    }, {
        provide: APP_ALLREADY,
        useFactory: () => {
            return () => {
                const { instance } = dec;
                if (instance.ngOnInit) instance.ngOnInit();
            }
        },
        deps: [],
        multi: true
    }]);
}
export class NgModuleClassAst extends ClassContext<NgModuleOptions> {
    declarations: TypeContext[] = [];
    exports: TypeContext[] = [];
    entryComponents: TypeContext[] = [];
    // 这里是启动组件 也就是首页 前端有用
    bootstrap: TypeContext[] = [];
    _imports: TypeContext[] = [];
    constructor(ast: any, context: any) {
        super(ast, context);
        const def = this.ast.metadataDef;
        if (def.declarations) this.declarations = this.forEachObjectToTypeContent(def.declarations);
        if (def.exports) this.exports = this.forEachObjectToTypeContent(def.exports);
        if (def.entryComponents) this.entryComponents = this.forEachObjectToTypeContent(def.entryComponents);
        if (def.bootstrap) this.bootstrap = this.forEachObjectToTypeContent(def.bootstrap);
        if (def.imports) {
            def.imports.map(imp => {
                if (isType(imp)) {
                    // type
                    return this.context.visitType(imp);
                } else {
                    // ModuleWithProviders
                    const { ngModule, providers } = imp as ModuleWithProviders
                    const context = this.context.visitType(ngModule);
                    if (context && providers) {
                        providers.map(pro => this.handlerProvider(context.injector, pro));
                    }
                    return context;
                }
            })
        }
        if (def.imports) this._imports = this.forEachObjectToTypeContent(def.imports);
        const injector = this.context.typeContext.injector;
        if (def.exports) {
            def.exports.map(exp => injector.setExport(exp))
        }
        if (this._imports) {
            this._imports.map(imp => {
                injector.extend(imp.injector)
            })
        }
        // 这里需要注册 Provider
        // 需要注册的有 declarations,providers,imports 的 exports
        // 处理 declarations
        this.declarations.map(dec => {
            const deps = handlerTypeContextToParams(dec);
            const declarationProvider: FactoryProvider = {
                provide: dec.target,
                useFactory: (...params) => new dec.target(...params),
                deps: deps,
                multi: false
            }
            injector.setStatic([declarationProvider]);
            injector.setExport(dec.target);
            // 注册属性赋值器
            setAppInitializer(injector, dec)
        });
        // 处理provider
        if (def.providers) {
            def.providers.map(pro => this.handlerProvider(injector, pro));
        }
        // 当前ngModule注入
        const typeContext = this.context.typeContext;
        let deps: any[] = [];
        if (typeContext) {
            deps = handlerTypeContextToParams(typeContext)
            setAppInitializer(injector, typeContext)
        }
        const proProvider: FactoryProvider = {
            provide: this.ast.target,
            useFactory: (...params: any) => new this.ast.target(...params),
            deps: deps,
            multi: false
        }
        injector.setStatic([proProvider]);
        injector.setExport(this.ast.target);
        setAppInitializer(injector, typeContext);

        injector.setExport(APP_INITIALIZER);
        // 处理属性inject
        injector.debug();
    }

    handlerProvider(injector: Injector, pro: Provider) {
        if (isTypeProvider(pro)) {
            // 这里必须有上下级关系，保留
            const ctx = this.context.visitType(pro);
            let deps: any[] = [];
            if (ctx) {
                deps = handlerTypeContextToParams(ctx)
                setAppInitializer(injector, ctx)
            }
            const proProvider: FactoryProvider = {
                provide: pro,
                useFactory: (...params: any) => new pro(...params),
                deps: deps,
                multi: false
            }
            injector.setStatic([proProvider]);
            injector.setExport(pro);
        } else if (isClassProvider(pro)) {
            const ctx = this.context.typeContext.visitor.visitType(pro);
            let deps: any[] = [];
            if (ctx) {
                deps = handlerTypeContextToParams(ctx)
                setAppInitializer(injector, ctx)
            }
            const proProvider: StaticClassProvider = {
                ...pro,
                deps: deps
            }
            injector.setStatic([proProvider]);
            injector.setExport(pro.provide);
        } else {
            injector.setStatic([pro]);
            injector.setExport(pro.provide);
        }
    }
}
export function isNgModuleClassAst(ast: ClassAst): ast is ClassAst<NgModuleOptions> {
    return ast.metadataKey === NgModuleMetadataKey;
}
