import { NgModule, IS_DEV } from 'nger-core'
import { WebpackConfigToken } from 'nger-module-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { Configuration } from 'webpack'
import { join } from 'path';
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const root = process.cwd();
import assets from './assets';
import { Injector } from 'nger-di'
@NgModule({
    providers: [{
        provide: WebpackConfigToken,
        useFactory: (injector: Injector) => {
            const dev = injector.get(IS_DEV);
            let output = {
                path: join(root, 'template/admin'),
                publicPath: `/template/admin/`,
                filename: '[name]_[hash].bound.js',
                chunkFilename: '[name]_[hash].chunk.js'
            }
            if (dev) {
                output = {
                    path: join(root, 'template/admin'),
                    publicPath: `/`,
                    filename: '[name]_[hash].bound.js',
                    chunkFilename: '[name]_[hash].chunk.js'
                }
            }
            return {
                entry: {
                    main: [join(root, 'src/admin.ts')]
                },
                mode: dev ? 'development' : 'production',
                devtool: dev ? 'source-map' : 'none',
                watch: dev ? true : false,
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
                            'manifest', 'vendors', 'main'
                        ],
                    }),
                    new webpack.WatchIgnorePlugin([
                        /\.js$/,
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
                        chunks: 'async',
                        minSize: 30000,
                        minChunks: 1,
                        maxAsyncRequests: 5,
                        maxInitialRequests: 3,
                        name: true,
                        cacheGroups: {
                            vendor: {
                                test: /[\\/]node_modules[\\/]/,
                                name: "vendors",
                                priority: -20,
                                chunks: "all"
                            },
                            default: {
                                minChunks: 2,
                                priority: -20,
                                reuseExistingChunk: true
                            }
                        }
                    }
                }
            } as Configuration
        },
        multi: true,
        deps: [Injector]
    }]
})
export class NgerWebpackAdmin { }
