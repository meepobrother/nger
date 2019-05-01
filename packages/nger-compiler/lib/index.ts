import styleProviders, { NgerPlatformStyle } from './style'
import { StaticProvider } from 'nger-di'
import { NgerCompilerImage } from './assets/image'
import { NgerCompilerUglify } from './ts/uglify'
import { NgerCompilerBabel } from './ts/babel'
import { TraverVisitor, Resolver } from 'nger-core'
import { NgerCompilerTypescript } from './ts/typescript'
import { NgerCompilerRollup } from './ts/rollup'
import { NgerCompilerNgTemplate } from './html/ng'
import { NgerCompilerCid } from './helper/cid'
export {
    NgerCompilerImage,
    NgerCompilerUglify,
    NgerPlatformStyle,
    NgerCompilerTypescript,
    NgerCompilerRollup,
    NgerCompilerNgTemplate,
    NgerCompilerCid
}
const provides: StaticProvider[] = [
    ...styleProviders,
    {
        provide: NgerCompilerCid,
        useClass: NgerCompilerCid,
        deps: []
    },
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
    }, {
        provide: NgerCompilerBabel,
        useClass: NgerCompilerBabel,
        deps: [
            NgerCompilerTypescript,
            TraverVisitor,
            Resolver
        ]
    }
]

export default provides;