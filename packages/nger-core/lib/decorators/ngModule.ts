import { makeDecorator, ClassContext, ClassAst, TypeContext, ConstructorAst, ConstructorContext } from 'ims-decorator';
export const NgModuleMetadataKey = 'NgModuleMetadataKey';
import { InjectConstructorAst } from './inject'
import { Provider, Type, ModuleWithProviders, SchemaMetadata } from 'nger-di';
export interface NgModuleOptions {
    providers?: Provider[];
    declarations?: Array<Type<any> | any[]>;
    imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
    exports?: Array<Type<any> | any[]>;
    entryComponents?: Array<Type<any> | any[]>;
    // 这里是启动组件 也就是首页 前端有用
    bootstrap?: Array<Type<any> | any[]>;
    schemas?: Array<SchemaMetadata | any[]>;
    id?: string;
    jit?: true;
}
export const NgModule = makeDecorator<NgModuleOptions>(NgModuleMetadataKey);
import { isTypeProvider, isClassProvider, InjectFlags } from 'nger-di';
import { StaticClassProvider, FactoryProvider } from '@angular/core/src/di/provider';
import { HostConstructorAst } from './host';
import { SkipSelfConstructorAst } from './skip-self';
import { SelfConstructorAst } from './self';
import { OptionalConstructorAst } from './optional';
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
    dec.paramsTypes.map((par, index) => {
        if (!deps[index]) deps[index] = par;
    });
    return deps;
}
export class NgModuleClassAst extends ClassContext<NgModuleOptions> {
    declarations: TypeContext[] = [];
    exports: TypeContext[] = [];
    entryComponents: TypeContext[] = [];
    // 这里是启动组件 也就是首页 前端有用
    bootstrap: TypeContext[] = [];
    _imports: TypeContext[] = [];
    _providers: TypeContext[] = [];
    constructor(ast: any, context: any) {
        super(ast, context);
        const def = this.ast.metadataDef;
        if (def.declarations) this.declarations = this.forEachObjectToTypeContent(def.declarations);
        if (def.exports) this.exports = this.forEachObjectToTypeContent(def.exports);
        if (def.entryComponents) this.entryComponents = this.forEachObjectToTypeContent(def.entryComponents);
        if (def.bootstrap) this.bootstrap = this.forEachObjectToTypeContent(def.bootstrap);
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
            const deps = handlerTypeContextToParams(dec)
            const declarationProvider: FactoryProvider = {
                provide: dec.target,
                useFactory: (...params) => new dec.target(...params),
                deps: deps,
                multi: false
            }
            injector.setStatic([declarationProvider]);
            injector.setExport(dec.target);
        })
        // 处理provider
        if (def.providers) {
            def.providers.map(pro => {
                if (isTypeProvider(pro)) {
                    const ctx = this.context.typeContext.visitor.visitType(pro);
                    let deps: any[] = [];
                    if (ctx) {
                        deps = handlerTypeContextToParams(ctx)
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
                    const deps = [];
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
            });
        }
        injector.debug();
    }
}
export function isNgModuleClassAst(ast: ClassAst): ast is ClassAst<NgModuleOptions> {
    return ast.metadataKey === NgModuleMetadataKey;
}
