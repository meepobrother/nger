import { Logger } from 'nger-logger';
import { NgerPlatformExpress } from 'nger-platform-express'
import { NgerPlatformKoa } from 'nger-platform-koa'
import { Injectable, Inject, NgModuleRef, Type } from 'nger-core';
@Injectable()
export class NgerCliStart {
    @Inject() logger: Logger;
    /** express */
    express<T>(type: Type<T>) {
        new NgerPlatformExpress().bootstrap(type);
    }
    /** koa */
    koa<T>(type: Type<T>) {
        new NgerPlatformKoa().bootstrap(type);
    }
    /** hapi */
    async hapi<T>(type: Type<T>) {

    }
}