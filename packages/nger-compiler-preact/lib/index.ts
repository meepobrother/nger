import { NgerCompilerPreact } from './preact'
import { NgerCompilerPreactHtml } from './html'
import { NgerCompilerPreactStyle } from './style'
import { NgerCompilerPreactTypescript } from './typescript'
import { NgerCompilerPreactAssets } from './assets'
import { StaticProvider } from 'nger-di';
import { NgerCompilerNgMetadata } from 'nger-compiler'
import { NgModuleBootstrap } from 'nger-core'
const provider: StaticProvider[] = [{
    provide: NgModuleBootstrap,
    useExisting: NgerCompilerPreact,
    multi: true
}, {
    provide: NgerCompilerPreact,
    useClass: NgerCompilerPreact,
    deps: [
        NgerCompilerPreactHtml,
        NgerCompilerPreactStyle,
        NgerCompilerPreactAssets,
        NgerCompilerPreactTypescript,
        NgerCompilerNgMetadata
    ]
}, {
    provide: NgerCompilerPreactHtml,
    useClass: NgerCompilerPreactHtml,
    deps: []
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
