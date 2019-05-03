import styleProviders, { NgerPlatformStyle } from './style'
import { StaticProvider } from 'nger-di'
import { NgerCompilerImage } from './assets/image'
import { NgerCompilerUglify } from './ts/uglify'
import { NgerCompilerBabel } from './ts/babel'
import { TraverVisitor, Resolver, FileSystem, Logger } from 'nger-core'
import { NgerCompilerTypescript } from './ts/typescript'
import { NgerCompilerController } from './ts/controller'
import { NgerCompilerRollup } from './ts/rollup'
import { NgerCompilerNgTemplate } from './html/ng'
import { NgerCompilerCid } from './helper/cid'
import { NgerCompilerNgMetadata } from './helper/ng_metadata'
import { NgerCompilerBabelController } from './ts/controllerBabel'
export {
    NgerCompilerImage,
    NgerCompilerUglify,
    NgerPlatformStyle,
    NgerCompilerTypescript,
    NgerCompilerRollup,
    NgerCompilerNgTemplate,
    NgerCompilerCid,
    NgerCompilerNgMetadata,
    NgerCompilerBabel,
    NgerCompilerBabelController
}
import { NgerUtil } from 'nger-util'
import { controllerVisitor } from './visitors/controller'
const provides: StaticProvider[] = [
    ...styleProviders,
    {
        provide: NgerCompilerBabelController,
        useClass: NgerCompilerBabelController,
        deps: [
            NgerCompilerController,
            TraverVisitor,
            Resolver
        ]
    },
    {
        provide: NgerCompilerController,
        useClass: NgerCompilerController,
        deps: []
    },
    {
        provide: TraverVisitor,
        useValue: controllerVisitor,
        multi: true
    },
    {
        provide: NgerCompilerNgMetadata,
        useClass: NgerCompilerNgMetadata,
        deps: []
    },
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