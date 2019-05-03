import { NgerCompilerPreact } from './preact'
import { NgerCompilerPreactHtml } from './html'
import { NgerCompilerPreactStyle } from './style'
import { NgerCompilerPreactTypescript } from './typescript'
import { NgerCompilerPreactAssets } from './assets'
import { NgerCompilerPreactController } from './controller'

import { StaticProvider, Injector } from 'nger-di';
import { NgerCompilerNgMetadata } from 'nger-compiler'
import { NgModuleBootstrap, NgerConfig } from 'nger-core'
import ngerCompiler, { NgerPlatformStyle } from 'nger-compiler'
const provider: StaticProvider[] = [...ngerCompiler, {
    provide: NgModuleBootstrap,
    useClass: NgerCompilerPreact,
    deps: [
        NgerCompilerPreactHtml,
        NgerCompilerPreactStyle,
        NgerCompilerPreactAssets,
        NgerCompilerPreactTypescript,
        NgerCompilerNgMetadata,
        NgerCompilerPreactController,
        NgerConfig
    ],
    multi: true
}, {
    provide: NgerCompilerPreactController,
    useClass: NgerCompilerPreactController,
    deps: []
}, {
    provide: NgerCompilerPreactHtml,
    useClass: NgerCompilerPreactHtml,
    deps: [Injector]
}, {
    provide: NgerCompilerPreactStyle,
    useClass: NgerCompilerPreactStyle,
    deps: [NgerPlatformStyle]
}, {
    provide: NgerCompilerPreactTypescript,
    useClass: NgerCompilerPreactTypescript,
    deps: []
}, {
    provide: NgerCompilerPreactAssets,
    useClass: NgerCompilerPreactAssets,
    deps: []
}];
export default provider;
