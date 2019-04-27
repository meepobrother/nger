import { NgModuleRef } from './core'
import { Type, Injector } from 'nger-di'
import { visitor } from '../visitor'
import { createStaticProvider, clearCache, getModules } from './createStaticProvider'
export class Compiler {
    modules: Map<Type<any>, NgModuleRef<any>> = new Map();
    compileNgModuleRef<T>(
        type: Type<T>,
        // 上级
        injector: Injector
    ): NgModuleRef<T> {
        clearCache();
        // ng module只创建一次
        const old = this.modules.get(type);
        if (old) return old;
        // 生成注入参数
        const ctx = visitor.visitType(type);
        // 设置injector
        ctx.injector = injector;
        const ref = new NgModuleRef<T>(ctx);
        this.modules.set(type, ref);
        return ref;
    }
    // 启动模块
    bootstrap<T>(type: Type<T>, injector: Injector = new Injector([])): NgModuleRef<T> {
        const ctx = visitor.visitType(type);
        const staticProviders = createStaticProvider(ctx);
        ctx.injector = injector.create(staticProviders);
        const parentInjector = ctx.injector;
        const ref = new NgModuleRef<T>(ctx);
        this.modules.set(type, ref);
        // 其他的 次要的
        const modules = getModules();
        modules.map(module => {
            const ref = this.modules.get(module);
            if (!ref) this.compileNgModuleRef(module, parentInjector)
        });
        return this.compileNgModuleRef(type, injector)
    }
}