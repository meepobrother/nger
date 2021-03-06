import { NgerWebpackManager, optimization, assetsRules } from 'nger-webpack'
import { Injector } from 'nger-di'
import { isDevMode, getCurrentDev } from 'nger-core'
const root = process.cwd();
import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { Configuration } from 'webpack'
const StatsPlugin = require('stats-webpack-plugin');
export function init(injector: Injector) {
    const manager = injector.get(NgerWebpackManager)
    return () => {
        const dev = isDevMode();
        const output = {
            path: join(root, 'template/admin'),
            publicPath: '/admin',
            filename: '[name]_[hash].bound.js',
            chunkFilename: '[name]_[hash].chunk.js'
        }
        const optimi = optimization;
        const name = getCurrentDev();
        if (!name) {
            throw new Error(`当前开发项目不纯在`)
        }
        const chunks =  ['runtime', 'vendor', 'common', 'main']
        manager.options.push({
            entry: {
                main: [join(root, `.temp/addon/${name}/admin.js`)]
            },
            resolve: {
                extensions: ['.js', '.jsx'],
                mainFields: ['main:h5', 'main', 'module'],
                symlinks: true,
                modules: [join(root, 'node_modules'), join(root, 'packages')]
            },
            profile: true,
            recordsPath: join(root, 'data/webpack/app.json'),
            mode: dev ? 'development' : 'production',
            devtool: dev ? 'source-map' : 'none',
            watch: dev ? true : false,
            target: 'web',
            plugins: [
                new StatsPlugin('stats.json', {
                    chunkModules: true
                }),
                new HtmlWebpackPlugin({
                    cache: false,
                    template: join(__dirname, 'index.html'),
                    filename: 'index.html',
                    chunks: chunks,
                }),
                new webpack.HotModuleReplacementPlugin(),
            ],
            output: output,
            module: {
                rules: [...assetsRules]
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