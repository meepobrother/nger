import { StaticProvider, Injector } from '@nger/di';
import { isDevMode, Logger, APP_INITIALIZER } from '@nger/core';
import preactProviders from '@nger/compiler-preact';
import { createPlatformFactory, NgModuleBootstrap } from '@nger/core';
import NgerPlatformNode from '@nger/platform-node';
import { NgerPlatformKoa } from './bootstrap';
import { NgerUtil } from '@nger/util';

import ngerWebpack from '@nger/webpack'
import ngerWebpackAdmin from '@nger/webpack-admin'
import ngerWebpackPc from '@nger/webpack-pc'
import ngerWebpackApp from '@nger/webpack-app'

export default createPlatformFactory(NgerPlatformNode, 'koa', [
    ...ngerWebpack,
    ...ngerWebpackAdmin,
    ...ngerWebpackPc,
    ...ngerWebpackApp,
    {
    provide: APP_INITIALIZER,
    useFactory: (injector: Injector) => {
        return () => {
            let providers: StaticProvider[] = [];
            if (isDevMode()) {
                providers = [
                    ...providers,
                    ...preactProviders
                ]
            }
            injector.setStatic(providers)
        }
    },
    deps: [Injector],
    multi: true
}, {
    provide: NgModuleBootstrap,
    useClass: NgerPlatformKoa,
    deps: [Logger, NgerUtil],
    multi: true
}])