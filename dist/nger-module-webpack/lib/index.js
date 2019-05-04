"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const tokens_1 = require("./providers/tokens");
exports.WebpackConfigToken = tokens_1.WebpackConfigToken;
const merge_1 = require("./providers/merge");
exports.WebpackMergeService = merge_1.WebpackMergeService;
const webpack_1 = require("./providers/webpack");
exports.WebpackService = webpack_1.WebpackService;
const path_1 = require("path");
const StatsPlugin = require('stats-webpack-plugin');
const root = process.cwd();
let NgerModuleWebpack = class NgerModuleWebpack {
};
NgerModuleWebpack = tslib_1.__decorate([
    nger_core_1.NgModule({
        providers: [
            merge_1.WebpackMergeService,
            webpack_1.WebpackService,
            {
                provide: tokens_1.WebpackConfigToken,
                useValue: {
                    mode: 'development',
                    entry: path_1.join(root, 'src/admin.ts'),
                    resolve: {
                        extensions: ['.ts', '.tsx', '.js', '.jsx'],
                        mainFields: ['main:h5', 'main', 'module'],
                        symlinks: true,
                        modules: [path_1.join(root, 'packages'), path_1.join(root, 'node_modules')]
                    },
                    profile: true,
                    recordsPath: path_1.join(root, 'data/webpack/admin.json'),
                    plugins: [
                        new StatsPlugin('stats.json', {
                            chunkModules: true
                        })
                    ],
                    optimization: {
                        minimizer: []
                    }
                },
                multi: true
            }
        ]
    })
], NgerModuleWebpack);
exports.NgerModuleWebpack = NgerModuleWebpack;
