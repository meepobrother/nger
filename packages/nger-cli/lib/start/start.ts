import { Logger } from 'nger-logger';
import ngerPlatformExpress from 'nger-platform-express'
import ngerPlatformKoa from 'nger-platform-koa'
import { Injectable, Inject, Type } from 'nger-core';
@Injectable()
export class NgerCliStart {
    @Inject() logger: Logger;
    /** express */
    express<T>(type: Type<T>) {
        ngerPlatformExpress().bootstrapModule(type, {})
        // ngerPlatformExpress.bootstrap([])(type);
    }
    /** koa */
    koa<T>(type: Type<T>) {
        this.logger && this.logger.info(`koa is running`)
        ngerPlatformKoa().bootstrapModule(type, {})
    }
    /** hapi */
    async hapi<T>(type: Type<T>) {

    }
}