import { TypeContext } from 'ims-decorator';
import { Logger } from 'nger-logger';
import { NgerPlatformExpress } from 'nger-platform-express'
import { NgerPlatformKoa } from 'nger-platform-koa'
import { Injectable, Inject } from 'nger-core';

@Injectable()
export class NgerCliStart {
    @Inject() logger: Logger;
    /** express */
    express(context: TypeContext) {
        new NgerPlatformExpress().bootstrap(context);
    }
    /** koa */
    koa(context: TypeContext) {
        new NgerPlatformKoa().bootstrap(context);
    }
    /** hapi */
    async hapi(context: TypeContext) {

    }
}