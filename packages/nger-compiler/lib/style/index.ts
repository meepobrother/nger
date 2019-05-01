import { StaticProvider } from 'nger-di';
import { NgerCompilerSass } from './sass'
import { NgerCompilerLess } from './less'
import { NgerCompilerStylus } from './stylus'
import { NgerCompilerPostcss } from './postcss'
import { NgerCompilerCsso } from './csso';
import { NgerPlatformStyle } from './nger-platform-style'

export {
    NgerPlatformStyle
}
const staticProviders: StaticProvider[] = [{
    provide: NgerPlatformStyle,
    useClass: NgerPlatformStyle,
    deps: [
        NgerCompilerLess,
        NgerCompilerSass,
        NgerCompilerCsso,
        NgerCompilerPostcss,
        NgerCompilerStylus
    ]
}, {
    provide: NgerCompilerSass,
    useClass: NgerCompilerSass,
    deps: []
}, {
    provide: NgerCompilerLess,
    useClass: NgerCompilerLess,
    deps: []
}, {
    provide: NgerCompilerStylus,
    useClass: NgerCompilerStylus,
    deps: []
}, {
    provide: NgerCompilerPostcss,
    useClass: NgerCompilerPostcss,
    deps: []
}, {
    provide: NgerCompilerCsso,
    useClass: NgerCompilerCsso,
    deps: []
}]
export default staticProviders;