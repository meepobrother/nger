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
            await this.run(context);
            const initializers = context.injector.get(APP_INITIALIZER) as any[];
            await Promise.all(initializers.map(init => init()));
            const readys = context.injector.get(APP_ALLREADY) as any[];
            readys.map(res => res());
            const instance = context.instance;
            if ((instance as OnError).ngOnError) this.onErrorHandler = (e) => instance.ngOnError(e);
            console.log(this.onErrorHandler)
        } catch (e) {
            return this.catchError(e)
        }
    }
    abstract run(context: TypeContext): any;

    catchError(e: Error) {
        if (this.onErrorHandler) {
            return this.onErrorHandler(e)
        }
        throw e;
    }
}
