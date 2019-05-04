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
import { NgerCompilerNgMetadata } from './helper/ng_metadata'
import { controllerPropertyTransformerFactory, hasPropertyMetadata } from './transformer_factorys/controller'
import { WATCH_TASK, Task } from './tokens/watch_task'
import { NgerCompilerBootstrap, metadataCache, hasHandlerFileCache } from './bootstrap'
import { controllerVisitor } from './visitors/controller'
import { NgModuleBootstrap } from 'nger-core'
import { NgerUtil } from 'nger-util'
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
    controllerPropertyTransformerFactory,
    WATCH_TASK,
    Task,
    hasPropertyMetadata,
    metadataCache,
    hasHandlerFileCache
}
const provides: StaticProvider[] = [
    ...styleProviders,
    {
        provide: NgModuleBootstrap,
        useClass: NgerCompilerBootstrap,
        deps: [NgerUtil],
        multi: true
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