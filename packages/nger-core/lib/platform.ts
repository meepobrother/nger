import { APP_INITIALIZER, APP_ALLREADY } from './decorators/ngModule';
import { OnError } from './lifecycle_hooks';
import { InjectFlags, Type } from 'nger-di';
import { NgModuleRef } from 'nger-core';
import { Compiler } from './compiler';
export abstract class Platform {
    private onErrorHandler: (e: Error) => any;
    private compiler: Compiler;
    constructor() {
        this.compiler = new Compiler();
    }
    async bootstrap<T>(type: Type<T>) {
        const ref = this.compiler.bootstrap(type)
        if (process) {
            process.on('uncaughtException', (err: Error) => {
                return this.catchError(err)
            });
        }
        try {
            await this.init(ref)
            await this.run(ref);
        } catch (e) {
            return this.catchError(e)
        }
    }
    async init<T>(ref: NgModuleRef<T>) {
        // 遍历然后module创建
        const initializers = ref.injector.get(APP_INITIALIZER) as any[];
        const errors: any[] = [];
        const initKeys = Object.keys(initializers);
        for (let key of initKeys) {
            const init = initializers[key]
            try {
                await init()
            } catch (e) {
                errors.push(init)
            }
        }
        if (errors.length > 0) {
            console.log(`发现 ${errors.length} 个错误, 正在重试。。。`)
            await Promise.all(errors.map(init => init()))
        }
        // 先执行所有imports进来的NgModule
        const readys = ref.injector.get(APP_ALLREADY, [], InjectFlags.Optional) as any[];
        readys.map(res => res());
        const instance = ref.instance as any;
        if ((instance as OnError).ngOnError) this.onErrorHandler = (e) => instance.ngOnError(e);
    }
    abstract run<T>(ref: NgModuleRef<T>): any;
    // 错误捕获
    catchError(e: Error) {
        if (this.onErrorHandler) {
            return this.onErrorHandler(e)
        }
        throw e;
    }
}
