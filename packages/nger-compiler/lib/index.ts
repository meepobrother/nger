import styleProviders, { NgerPlatformStyle } from './style'
import { StaticProvider } from 'nger-di'
import { NgerCompilerImage } from './assets/image'
import { NgerCompilerUglify } from './ts/uglify'
import { NgerCompilerTypescript } from './ts/typescript'
import { NgerCompilerRollup } from './ts/rollup'
import { NgerCompilerNgTemplate } from './html/ng'
export {
    NgerCompilerImage,
    NgerCompilerUglify,
    NgerPlatformStyle,
    NgerCompilerTypescript,
    NgerCompilerRollup,
    NgerCompilerNgTemplate
}
const provides: StaticProvider[] = [
    ...styleProviders,
    {
        provide: NgerCompilerImage,
        useClass: NgerCompilerImage,
        deps: []
    },
    {
        provide: NgerCompilerUglify,
        useClass: NgerCompilerUglify,
        deps: []
    }, {
        provide: NgerCompilerTypescript,
        useClass: NgerCompilerTypescript,
        deps: []
    }, {
        provide: NgerCompilerRollup,
        useClass: NgerCompilerRollup,
        deps: []
    }, {
        provide: NgerCompilerNgTemplate,
        useClass: NgerCompilerNgTemplate,
        deps: []
    }
]

export default provides;