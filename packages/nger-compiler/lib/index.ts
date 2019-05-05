import styleProviders, { NgerPlatformStyle } from './style'
import { StaticProvider } from 'nger-di'
import { NgerCompilerImage } from './assets/image'
import { NgerCompilerUglify } from './ts/uglify'
import { NgerCompilerBabel } from './ts/babel'
import { Resolver } from 'nger-core'
import { NgerCompilerTypescript } from './ts/typescript'
import { NgerCompilerRollup } from './ts/rollup'
import { NgerCompilerNgTemplate,Visitor,Node } from './html/ng'
import { NgerCompilerCid } from './helper/cid'
import { NgerCompilerNgMetadata } from './helper/ng_metadata'
import { controllerPropertyTransformerFactory, hasMetadata } from './transformer_factorys/controller'
import { componentRenderTransformerFactory } from './transformer_factorys/component'

import { WATCH_TASK, Task } from './tokens/watch_task'
import { NgerCompilerBootstrap, metadataCache, hasHandlerFileCache, templateCache } from './bootstrap'
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
    hasMetadata,
    metadataCache,
    hasHandlerFileCache,
    templateCache,
    componentRenderTransformerFactory,
    Visitor,Node
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
            Resolver
        ]
    }
]

export default provides;