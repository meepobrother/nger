import { TypeContext, isType, Type, ConstructorContext, } from 'ims-decorator';
import {
    NgModuleMetadataKey, NgModuleClassAst, OptionalConstructorAst,
    SelfConstructorAst, InjectConstructorAst, HostConstructorAst,
    SkipSelfConstructorAst
} from 'nger-core';
import {
    ModuleWithProviders, Provider, InjectFlags, isTypeProvider, isClassProvider, StaticProvider
} from 'nger-di';

export function providerToStaticProvider(provider: Provider, context: TypeContext): StaticProvider {
    if (isTypeProvider(provider)) {
        const ctx = context.visitType(provider)
        return {
            provide: provider,
            useFactory: (...args: any[]) => new provider(...args),
            deps: handlerTypeContextToParams(ctx)
        }
    }
    else if (isClassProvider(provider)) {
        const ctx = context.visitType(provider.useClass)
        return {
            // 修复
            ...provider,
            deps: handlerTypeContextToParams(ctx)
        }
    }
    else if (Array.isArray(provider)) {
        console.error(`providerToStaticProvider:Error`, provider);
        // return provider.map(pro => providerToStaticProvider(pro, context))
        return provider;
    } else {
        return provider;
    }
}
const set: Set<any> = new Set();
export function clearCache() {
    set.clear();
}
export function getModules() {
    return set
}
export function createTypeProvider(imp: Type<any>, context: TypeContext) {
    return {
        provide: imp,
        useFactory: (...params: any[]) => new imp(...params),
        deps: handlerTypeContextToParams(context)
    }
}
export function createStaticProvider(context: TypeContext, providers: StaticProvider[] = []): StaticProvider[] {
    if (hasExist(context.target)) return [];
    const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
    if (ngModule) {
        const def = ngModule.ast.metadataDef;
        // 拿到import
        let imports: (Type<any> | ModuleWithProviders)[] = [];
        let declarations: Type<any>[] = [];
        // 初始化
        if (def.providers) def.providers.map(pro => {
            providers.push(providerToStaticProvider(pro, context))
        });
        if (def.imports) imports = def.imports;
        if (def.declarations) declarations = def.declarations;
        // 不用处理providers
        // console.info(`after import \n\t providers: ${providers.length}`)
        // 类 👌
        declarations.map(imp => {
            let impContext = context.visitType(imp) as TypeContext;
            ngModule.declarations.push(impContext);
            // 这部分不加入依赖注入
            providers.push({
                provide: imp,
                useFactory: (...params: any[]) => new imp(...params),
                deps: handlerTypeContextToParams(impContext)
            });
        });
        // todo ngmodule 不应该在依赖注入里
        // providers.push({
        //     provide: context.target,
        //     useFactory: (...params: any[]) => new context.target(...params),
        //     deps: handlerTypeContextToParams(context)
        // });
        if (imports) {
            // 解析imports
            imports.map(imp => {
                createChildProviders(imp, context, providers)
            });
        }
    }
    return providers;
}
// 子模块 import ngModule
function hasExist(target: any) {
    if (set.has(target)) {
        return true;
    }
    set.add(target)
    return false;
}
function createChildProviders(imp: Type<any> | ModuleWithProviders, context: TypeContext, providers: StaticProvider[]) {
    // 这是一个独立的module
    let impContext: TypeContext;
    if (isType(imp)) {
        // 获取context
        impContext = context.visitType(imp) as TypeContext;
    } else {
        // ModuleWithProviders
        const moduleWithProviders = imp as ModuleWithProviders;
        impContext = context.visitType(moduleWithProviders.ngModule) as TypeContext;
        moduleWithProviders.providers.map(pro => {
            providers.push(providerToStaticProvider(pro, impContext))
        });
    }
    createStaticProvider(impContext, providers);
}
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
export function handlerTypeContextToParams(dec: TypeContext) {
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

