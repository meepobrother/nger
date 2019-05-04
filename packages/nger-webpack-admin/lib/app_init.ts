import { NgerWebpackManager, optimization, assetsRules, } from 'nger-webpack'
import { Injector } from 'nger-di'
import { isDevMode, getCurrentDev } from 'nger-core'
const root = process.cwd();
import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { Configuration } from 'webpack'
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

export function init(injector: Injector) {
    const manager = injector.get(NgerWebpackManager)
    return () => {
        const dev = isDevMode();
        const output = {
            path: join(root, 'template/admin'),
            publicPath: dev ? `/` : '/admin',
            filename: '[name]_[hash].bound.js',
            chunkFilename: '[name]_[hash].chunk.js'
        }
        const optimi = dev ? {} : optimization;
        const name = getCurrentDev();
        if (!name) {
            throw new Error(`当前开发项目不纯在`)
        }
        manager.options.push({
            entry: {
                main: [join(root, `.temp/addon/${name}/admin.js`)]
            },
            mode: dev ? 'development' : 'production',
            devtool: dev ? 'source-map' : 'none',
            watch: dev ? true : false,
            externals: [],
            target: 'web',
            resolve: {
                plugins: [
                    new TsconfigPathsPlugin({ configFile: 'tsconfig.json' }),
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    cache: false,
                    template: join(__dirname, 'index.html'),
                    filename: 'index.html',
                    chunks: [
                        'runtime', 'vendor', 'common', 'main'
                    ],
                }),
                new webpack.WatchIgnorePlugin([
                    /\.d\.ts$/
                ]),
                new webpack.HotModuleReplacementPlugin(),
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
                }, ...assetsRules]
            },
            performance: {
                hints: 'warning',
                maxEntrypointSize: 1700000,
                maxAssetSize: 1700000
            },
            ...optimi
        } as Configuration)
    }

}