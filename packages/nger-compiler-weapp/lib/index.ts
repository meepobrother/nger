import { NgerCompilerWeapp } from './weapp'
import { NgerCompilerWeappHtml } from './html'
import { NgerCompilerWeappStyle } from './style'
import { NgerCompilerWeappTypescript } from './typescript'
import { NgerCompilerWeappAssets } from './assets'
import { StaticProvider, Injector } from 'nger-di';
import { NgerCompilerNgMetadata } from 'nger-compiler'
import { NgModuleBootstrap, NgerConfig } from 'nger-core'
const provider: StaticProvider[] = [{
    provide: NgModuleBootstrap,
    useClass: NgerCompilerWeapp,
    deps: [
        NgerCompilerWeappHtml,
        NgerCompilerWeappStyle,
        NgerCompilerWeappAssets,
        NgerCompilerWeappTypescript,
        NgerCompilerNgMetadata,
        NgerConfig
    ],
    multi: true
}, {
    provide: NgerCompilerWeappHtml,
    useClass: NgerCompilerWeappHtml,
    deps: [Injector]
}, {
    provide: NgerCompilerWeappStyle,
    useClass: NgerCompilerWeappStyle,
    deps: []
}, {
    provide: NgerCompilerWeappTypescript,
    useClass: NgerCompilerWeappTypescript,
    deps: []
}, {
    provide: NgerCompilerWeappAssets,
    useClass: NgerCompilerWeappAssets,
    deps: []
}];
export default provider;
