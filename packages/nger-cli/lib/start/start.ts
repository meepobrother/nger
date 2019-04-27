import { Logger } from 'nger-logger';
import { NgerPlatformExpress } from 'nger-platform-express'
import { NgerPlatformKoa } from 'nger-platform-koa'
import { Injectable, Inject, NgModuleRef } from 'nger-core';
@Injectable()
export class NgerCliStart {
    @Inject() logger: Logger;
    /** express */
    express<T>(ref: NgModuleRef<T>) {
        new NgerPlatformExpress().bootstrap(ref);
    }
    /** koa */
    koa<T>(ref: NgModuleRef<T>) {
        new NgerPlatformKoa().bootstrap(ref);
    }
    /** hapi */
    async hapi<T>(ref: NgModuleRef<T>) {

    }
}