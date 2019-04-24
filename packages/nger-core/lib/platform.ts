import { TypeContext } from 'ims-decorator';
import { APP_INITIALIZER, APP_ALLREADY } from './decorators/ngModule';
export abstract class Platform {
    async bootstrap(context: TypeContext) {
        await this.run(context);
        const initializers = context.injector.get(APP_INITIALIZER) as any[];
        await Promise.all(initializers.map(init => init()));
        const readys = context.injector.get(APP_ALLREADY) as any[];
        readys.map(res => res());
    }
    abstract run(context: TypeContext): any;
}
