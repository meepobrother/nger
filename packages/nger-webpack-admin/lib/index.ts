import { NgModule } from 'nger-core'
import { WebpackConfigToken } from 'nger-module-webpack';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import webpack, { Configuration } from 'webpack'
import { join } from 'path';
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const root = process.cwd();
import assets from './assets';
@NgModule({
    providers: [{
        provide: WebpackConfigToken,
        useValue: {
            entry: {
                main: ['webpack-hot-middleware/client?noInfo=true&reload=true', join(root, 'src/admin.ts')]
            },
            devtool: 'inline-source-map',
            watch: true,
            resolve: {
                plugins: [
                    new TsconfigPathsPlugin({ configFile: 'tsconfig.json' }),
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: join(__dirname, 'index.html'),
                    filename: 'index.html',
                    chunks: [
                        'manifest', 'main'
                    ]
                }),
                new webpack.WatchIgnorePlugin([
                    /\.js$/,
                    /\.d\.ts$/
                ]),
                new webpack.HotModuleReplacementPlugin(),
            ],
            output: {
                path: join(root, 'attachments/template/admin'),
                publicPath: `/attachments/template/admin/`,
                filename: '[name]_[hash].bound.js',
                chunkFilename: '[name]_[hash].chunk.js'
            },
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
                }, ...assets]
            },
            performance: {
                hints: 'warning',
                maxEntrypointSize: 1700000,
                maxAssetSize: 1700000
            },
            optimization: {
                runtimeChunk: {
                    name: 'manifest'
                },
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendors",
                            priority: -20,
                            chunks: "all"
                        }
                    }
                }
            }
        } as Configuration,
        multi: true
    }]
})
export class NgerWebpackAdmin { }
