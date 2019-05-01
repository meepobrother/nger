import { NgerCompilerPreact } from './preact'
import { NgerCompilerPreactHtml } from './html'
import { NgerCompilerPreactStyle } from './style'
import { NgerCompilerPreactTypescript } from './typescript'
import { NgerCompilerPreactAssets } from './assets'
import { StaticProvider, Injector } from 'nger-di';
import { NgerCompilerNgMetadata } from 'nger-compiler'
import { NgModuleBootstrap, NgerConfig } from 'nger-core'
const provider: StaticProvider[] = [{
    provide: NgModuleBootstrap,
    useClass: NgerCompilerPreact,
    deps: [
        NgerCompilerPreactHtml,
        NgerCompilerPreactStyle,
        NgerCompilerPreactAssets,
        NgerCompilerPreactTypescript,
        NgerCompilerNgMetadata,
        NgerConfig
    ],
    multi: true
}, {
    provide: NgerCompilerPreactHtml,
    useClass: NgerCompilerPreactHtml,
    deps: [Injector]
}, {
    provide: NgerCompilerPreactStyle,
    useClass: NgerCompilerPreactStyle,
    deps: []
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
