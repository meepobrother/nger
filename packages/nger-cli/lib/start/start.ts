import ngerPlatformKoa from 'nger-platform-koa'
import { Injectable, Inject, Type, Logger } from 'nger-core';
@Injectable()
export class NgerCliStart {
    @Inject() logger: Logger;
    /** koa */
    koa<T>(type: Type<T>) {
        this.logger && this.logger.info(`koa is running`)
        ngerPlatformKoa([]).bootstrapModule(type, {})
    }
}