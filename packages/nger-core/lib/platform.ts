import { TypeContext } from 'ims-decorator';
import { APP_INITIALIZER } from './decorators/ngModule';

export abstract class Platform {
    async bootstrap(context: TypeContext) {
        await this.run(context);
        const initializers = context.injector.get(APP_INITIALIZER) as any[];
        return Promise.all(initializers.map(init => init()))
    }
    abstract run(context: TypeContext): any;
}
