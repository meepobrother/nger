import { Injector } from 'nger-di';
import Koa from 'koa';
import { NgModuleRef } from 'nger-core';
import { NgerUtil } from 'nger-util';
import { Logger, NgModuleBootstrap } from 'nger-core';
import { TypeContext } from 'ims-decorator';
import { InjectionToken } from 'nger-di';
export declare const AdminTemplateEntry: InjectionToken<string>;
export declare class NgerPlatformKoa extends NgModuleBootstrap {
    logger: Logger;
    util: NgerUtil;
    injector: Injector;
    app: Koa;
    constructor(logger: Logger, util: NgerUtil);
    run<T>(ref: NgModuleRef<T>): Promise<void>;
    handler(declaration: TypeContext, router: any, controller: any, instance: any): void;
}
