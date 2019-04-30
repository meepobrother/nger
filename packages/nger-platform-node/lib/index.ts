import { createPlatformFactory, Logger, NgModuleBootstrap, FileSystem } from 'nger-core'
import { NgerUtil } from 'nger-util'
import ngerPlatformAxios from 'nger-platform-axios'
import { NgerPlatformNode } from './core/index'
import styleProviders, { NgerPlatformStyle } from 'nger-provider-style'
import typescriptProviders, { NgerCompilerTypescript, NgerBabel } from 'nger-provider-typescript'
import fs from 'fs-extra';
import { dirname } from 'path'
export default createPlatformFactory(ngerPlatformAxios, 'node', [
    ...styleProviders,
    ...typescriptProviders,
    {
        provide: NgModuleBootstrap,
        useClass: NgerPlatformNode,
        deps: [FileSystem, Logger, NgerPlatformStyle, NgerCompilerTypescript, NgerBabel],
        multi: true
    }, {
        provide: NgerUtil,
        useClass: NgerUtil,
        deps: [
            Logger
        ]
    }, {
        provide: FileSystem,
        useFactory: () => {
            const writeFileSync = fs.writeFileSync;
            const ensureDirSync = fs.ensureDirSync;
            // 先确认文件夹
            fs.writeFileSync = (path: fs.PathLike | number, data: any, options?: fs.WriteFileOptions) => {
                ensureDirSync(dirname(path.toString()))
                writeFileSync(path, data, options)
            }
            return fs;
        },
        deps: []
    }
]);