import { NgerCompilerPreact } from './preact'
import { NgerCompilerPreactHtml } from './html'
import { NgerCompilerPreactStyle } from './style'
import { NgerCompilerPreactTypescript } from './typescript'
import { NgerCompilerPreactAssets } from './assets'
import { StaticProvider } from 'nger-di';

const provider: StaticProvider[] = [{
    provide: NgerCompilerPreact,
    useClass: NgerCompilerPreact,
    deps: [
        NgerCompilerPreactHtml,
        NgerCompilerPreactStyle,
        NgerCompilerPreactAssets,
        NgerCompilerPreactTypescript
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
