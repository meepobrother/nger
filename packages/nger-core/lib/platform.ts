import { TypeContext } from 'ims-decorator';
import { APP_INITIALIZER, APP_ALLREADY } from './decorators/ngModule';
import { OnError } from './lifecycle_hooks';
export abstract class Platform {
    private onErrorHandler: (e: Error) => any;
    constructor() { }
    async bootstrap(context: TypeContext) {
        if (process) {
            process.on('uncaughtException', (err: Error) => {
                return this.catchError(err)
            });
        }
        try {
            const initializers = context.injector.get(APP_INITIALIZER) as any[];
            const errors: any[] = [];
            for (let init of initializers) {
                try {
                    await init()
                } catch (e) {
                    errors.push(init)
                }
            }
            console.log(`发现 ${errors.length} 个错误, 正在重试。。。`)
            await Promise.all(errors.map(init => init()))
            const readys = context.injector.get(APP_ALLREADY) as any[];
            readys.map(res => res());
            const instance = context.instance;
            if ((instance as OnError).ngOnError) this.onErrorHandler = (e) => instance.ngOnError(e);
            await this.run(context);
        } catch (e) {
            return this.catchError(e)
        }
    }
    abstract run(context: TypeContext): any;
    // 错误捕获
    catchError(e: Error) {
        if (this.onErrorHandler) {
            return this.onErrorHandler(e)
        }
        throw e;
    }
}
