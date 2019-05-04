"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_util_1 = require("nger-util");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const axios_1 = tslib_1.__importDefault(require("axios"));
const enhanced_resolve_1 = require("enhanced-resolve");
exports.default = nger_core_1.createPlatformFactory(nger_core_1.platformCore, 'node', [
    {
        provide: nger_core_1.APP_ROOT,
        useValue: process.cwd()
    },
    {
        provide: nger_core_1.NGER_CONFIG,
        useFactory: (root) => {
            const config = require(path_1.join(root, 'config/config.json'));
            return config;
        },
        deps: [nger_core_1.APP_ROOT],
        multi: true
    },
    {
        provide: nger_util_1.NgerUtil,
        useClass: nger_util_1.NgerUtil,
        deps: [
            nger_core_1.Logger,
            nger_core_1.NgerConfig
        ]
    }, {
        provide: nger_core_1.FILE_SYSTEM,
        useFactory: () => {
            const writeFileSync = fs_extra_1.default.writeFileSync;
            const ensureDirSync = fs_extra_1.default.ensureDirSync;
            const newWriteFileSync = (path, data, options) => {
                ensureDirSync(path_1.dirname(path.toString()));
                writeFileSync(path, data, options);
            };
            // 先确认文件夹
            fs_extra_1.default.writeFileSync = newWriteFileSync;
            return fs_extra_1.default;
        },
        deps: []
    }, {
        provide: nger_core_1.Resolver,
        useFactory: () => {
            const root = process.cwd();
            return enhanced_resolve_1.ResolverFactory.createResolver({
                fileSystem: new enhanced_resolve_1.CachedInputFileSystem(new enhanced_resolve_1.NodeJsInputFileSystem(), 4000),
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
                mainFields: ['main:h5', 'main', 'module'],
                symlinks: true,
                modules: [path_1.join(root, 'packages'), path_1.join(root, 'node_modules')]
            });
        },
        deps: []
    },
    {
        provide: nger_core_1.Http,
        useValue: axios_1.default
    }
]);
