import { createPlatformFactory, Logger, Http, NgerConfig, FILE_SYSTEM, Resolver, APP_ROOT, NGER_CONFIG, platformCore } from 'nger-core'
import { NgerUtil } from 'nger-util'
import fs from 'fs-extra';
import { dirname, join } from 'path'
import axios from 'axios';
import {
    NodeJsInputFileSystem,
    CachedInputFileSystem,
    ResolverFactory
} from 'enhanced-resolve';
export default createPlatformFactory(platformCore, 'node', [
    {
        provide: APP_ROOT,
        useValue: process.cwd()
    },
    {
        provide: NGER_CONFIG,
        useFactory: (root: string) => {
            const config = require(join(root, 'config/config.json'))
            return config;
        },
        deps: [APP_ROOT],
        multi: true
    },
    {
        provide: NgerUtil,
        useClass: NgerUtil,
        deps: [
            Logger,
            NgerConfig
        ]
    }, {
        provide: FILE_SYSTEM,
        useFactory: () => {
            const writeFileSync = fs.writeFileSync;
            const ensureDirSync = fs.ensureDirSync;
            const newWriteFileSync: any = (path: fs.PathLike | number, data: any, options?: fs.WriteFileOptions) => {
                ensureDirSync(dirname(path.toString()))
                writeFileSync(path, data, options)
            }
            // 先确认文件夹
            fs.writeFileSync = newWriteFileSync
            return fs;
        },
        deps: []
    }, {
        provide: Resolver,
        useFactory: () => {
            const root = process.cwd();
            return ResolverFactory.createResolver({
                fileSystem: new CachedInputFileSystem(new NodeJsInputFileSystem(), 4000) as any,
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
                mainFields: ['main:h5', 'main', 'module'],
                symlinks: true,
                modules: [join(root, 'packages'), join(root, 'node_modules')]
            })
        },
        deps: []
    },
    {
        provide: Http,
        useValue: axios
    }
]);