"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_webpack_1 = require("nger-webpack");
const nger_core_1 = require("nger-core");
const root = process.cwd();
const path_1 = require("path");
const html_webpack_plugin_1 = tslib_1.__importDefault(require("html-webpack-plugin"));
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const StatsPlugin = require('stats-webpack-plugin');
function init(injector) {
    const manager = injector.get(nger_webpack_1.NgerWebpackManager);
    return () => {
        const dev = nger_core_1.isDevMode();
        const output = {
            path: path_1.join(root, 'template/app'),
            publicPath: '/app',
            filename: '[name]_[hash].bound.js',
            chunkFilename: '[name]_[hash].chunk.js'
        };
        const name = nger_core_1.getCurrentDev();
        if (!name) {
            throw new Error(`当前开发项目不纯在`);
        }
        manager.options.push({
            entry: {
                main: [path_1.join(root, `.temp/addon/${name}/app.js`)]
            },
            resolve: {
                extensions: ['.js', '.jsx'],
                mainFields: ['main:h5', 'main', 'module'],
                symlinks: true,
                modules: [path_1.join(root, 'node_modules'), path_1.join(root, 'packages')]
            },
            profile: true,
            recordsPath: path_1.join(root, 'data/webpack/app.json'),
            mode: dev ? 'development' : 'production',
            devtool: dev ? 'source-map' : 'none',
            watch: dev ? true : false,
            externals: [],
            target: 'web',
            plugins: [
                new StatsPlugin('stats.json', {
                    chunkModules: true
                }),
                new html_webpack_plugin_1.default({
                    cache: false,
                    template: path_1.join(__dirname, 'index.html'),
                    filename: 'index.html',
                    chunks: ['runtime', 'vendor', 'common', 'main'],
                }),
                new webpack_1.default.WatchIgnorePlugin([
                    /\.d\.ts$/
                ]),
                new webpack_1.default.HotModuleReplacementPlugin(),
            ],
            output: output,
            module: {
                rules: [{
                        test: /\.tsx?$/,
                        enforce: 'pre',
                        use: [
                            {
                                loader: 'ts-loader',
                                options: {
                                    transpileOnly: true,
                                    configFile: 'tsconfig.json'
                                }
                            }
                        ]
                    }, ...nger_webpack_1.assetsRules]
            },
            performance: {
                hints: 'warning',
                maxEntrypointSize: 1700000,
                maxAssetSize: 1700000
            },
            ...nger_webpack_1.optimization
        });
    };
}
exports.init = init;
