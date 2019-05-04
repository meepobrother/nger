"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ngModule_1 = require("../decorators/ngModule");
const self_1 = require("../decorators/self");
const inject_1 = require("../decorators/inject");
const host_1 = require("../decorators/host");
const skip_self_1 = require("../decorators/skip-self");
const optional_1 = require("../decorators/optional");
const nger_di_1 = require("nger-di");
function providerToStaticProvider(provider, context) {
    if (nger_di_1.isTypeProvider(provider)) {
        const ctx = context.visitType(provider);
        return {
            provide: provider,
            useFactory: (...args) => new provider(...args),
            deps: handlerTypeContextToParams(ctx)
        };
    }
    else if (nger_di_1.isClassProvider(provider)) {
        const ctx = context.visitType(provider.useClass);
        return {
            // 修复
            ...provider,
            deps: handlerTypeContextToParams(ctx)
        };
    }
    else if (Array.isArray(provider)) {
        console.error(`providerToStaticProvider:Error`, provider);
        // return provider.map(pro => providerToStaticProvider(pro, context))
        return provider;
    }
    else {
        return provider;
    }
}
exports.providerToStaticProvider = providerToStaticProvider;
const set = new Set();
function clearCache() {
    set.clear();
}
exports.clearCache = clearCache;
function getModules() {
    return set;
}
exports.getModules = getModules;
function createTypeProvider(imp, context) {
    return {
        provide: imp,
        useFactory: (...params) => new imp(...params),
        deps: handlerTypeContextToParams(context)
    };
}
exports.createTypeProvider = createTypeProvider;
function createStaticProvider(context, providers = []) {
    if (hasExist(context.target))
        return [];
    const ngModule = context.getClass(ngModule_1.NgModuleMetadataKey);
    if (ngModule) {
        const def = ngModule.ast.metadataDef;
        // 拿到import
        let imports = [];
        let declarations = [];
        // 初始化
        if (def.providers)
            def.providers.map(pro => {
                providers.push(providerToStaticProvider(pro, context));
            });
        if (def.imports)
            imports = def.imports;
        if (def.declarations)
            declarations = def.declarations;
        // 不用处理providers
        // console.info(`after import \n\t providers: ${providers.length}`)
        // 类 👌
        declarations.map(imp => {
            let impContext = context.visitType(imp);
            // 是否要记录呢
            ngModule.declarations.push(impContext);
            // 这部分不加入依赖注入,这个地方
            providers.push({
                provide: imp,
                useFactory: (...params) => new imp(...params),
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
                createChildProviders(imp, context, providers);
            });
        }
    }
    return providers;
}
exports.createStaticProvider = createStaticProvider;
// 子模块 import ngModule
function hasExist(target) {
    if (set.has(target)) {
        return true;
    }
    set.add(target);
    return false;
}
function createChildProviders(imp, context, providers) {
    // 这是一个独立的module
    let impContext;
    if (ims_decorator_1.isType(imp)) {
        // 获取context
        impContext = context.visitType(imp);
    }
    else {
        // ModuleWithProviders
        const moduleWithProviders = imp;
        impContext = context.visitType(moduleWithProviders.ngModule);
        moduleWithProviders.providers.map(pro => {
            providers.push(providerToStaticProvider(pro, impContext));
        });
    }
    createStaticProvider(impContext, providers);
}
function handlerConstructorContext(deps, ast) {
    deps[ast.ast.parameterIndex] = deps[ast.ast.parameterIndex] || [];
    // 构造函数装饰器 这里就要判断了 目的是拿到token即可
    // 如果是Inject 那就是inject的target
    if (ast instanceof inject_1.InjectConstructorAst) {
        deps[ast.ast.parameterIndex].push(ast.ast.metadataDef.token || ast.ast.parameterType);
    }
    if (ast instanceof host_1.HostConstructorAst) {
        deps[ast.ast.parameterIndex].push(nger_di_1.InjectFlags.Host);
    }
    if (ast instanceof skip_self_1.SkipSelfConstructorAst) {
        deps[ast.ast.parameterIndex].push(nger_di_1.InjectFlags.SkipSelf);
    }
    if (ast instanceof self_1.SelfConstructorAst) {
        deps[ast.ast.parameterIndex].push(nger_di_1.InjectFlags.Self);
    }
    if (ast instanceof optional_1.OptionalConstructorAst) {
        deps[ast.ast.parameterIndex].push(nger_di_1.InjectFlags.Optional);
    }
}
function handlerTypeContextToParams(dec) {
    const deps = new Array(dec.paramsLength);
    dec.getConstructor().map(ast => {
        handlerConstructorContext(deps, ast);
    });
    dec.paramsTypes && dec.paramsTypes.map((par, index) => {
        if (!deps[index])
            deps[index] = par;
    });
    // 还要找到属性的 不赋值
    return deps;
}
exports.handlerTypeContextToParams = handlerTypeContextToParams;
