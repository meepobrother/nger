import { NgModule, IS_DEV } from 'nger-core'
import { WebpackConfigToken } from 'nger-module-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { Configuration } from 'webpack'
import { join } from 'path';
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const root = process.cwd();
import assets from './assets';
import { Injector } from 'nger-di'
import ts from 'typescript';
import { isDifferentialLoadingNeeded, findAllNodeModules } from './util'
const target: string = require(join(root, 'tsconfig.json')).compilerOptions.target;
const tsTarget = ts.ScriptTarget[target.toUpperCase()]
const supportES2015 = isDifferentialLoadingNeeded(root, tsTarget)
const rxjsPathMapping = supportES2015
    ? require('rxjs/_esm2015/path-mapping')()
    : require('rxjs/_esm5/path-mapping')();
const TerserPlugin = require('terser-webpack-plugin');
@NgModule({
    providers: [{
        provide: WebpackConfigToken,
        useFactory: (injector: Injector) => {
            const dev = injector.get(IS_DEV);
            const output = {
                path: join(root, 'template/admin'),
                publicPath: dev? `/`: '/admin',
                filename: '[name]_[hash].bound.js',
                chunkFilename: '[name]_[hash].chunk.js'
            }
            return {
                entry: {
                    main: [join(root, 'src/admin.ts')]
                },
                mode: dev ? 'development' : 'production',
                devtool: dev ? 'source-map' : 'none',
                watch: dev ? true : false,
                externals: [],
                target: 'web',
                resolve: {
                    mainFields: [
                        ...(supportES2015 ? ['es2015'] : []),
                        'browser', 'module', 'main',
                    ],
                    plugins: [
                        new TsconfigPathsPlugin({ configFile: 'tsconfig.json' }),
                    ],
                    alias: {
                        ...rxjsPathMapping as any
                    }
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
                    runtimeChunk: 'single',
                    minimizer: [
                        new TerserPlugin({
                            sourceMap: true,
                            parallel: true,
                            cache: true,
                            terserOptions: {
                                ecma: supportES2015 ? 6 : 5,
                                safari10: true,
                                output: {
                                    ascii_only: true,
                                    comments: false,
                                    webkit: true,
                                },
                                compress: {
                                    pure_getters: true,
                                    passes: 3
                                }
                            }

                        })
                    ],
                    splitChunks: {
                        maxAsyncRequests: Infinity,
                        cacheGroups: {
                            default: {
                                chunks: 'async',
                                minChunks: 2,
                                priority: 10,
                            },
                            common: {
                                name: 'common',
                                chunks: 'async',
                                minChunks: 2,
                                enforce: true,
                                priority: 5,
                            },
                            vendors: false,
                            vendor: {
                                name: 'vendor',
                                chunks: 'initial',
                                enforce: true,
                                test: (module: { nameForCondition?: Function }, chunks: Array<{ name: string }>) => {
                                    const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                                    return /[\\/]node_modules[\\/]/.test(moduleName)
                                        && !chunks.some(({ name }) => name === 'polyfills' || name === 'polyfills-es5');
                                },
                            },
                        },
                    }
                }
            } as Configuration
        },
        multi: true,
        deps: [Injector]
    }]
})
export class NgerWebpackAdmin { }
