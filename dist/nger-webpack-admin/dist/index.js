Object.defineProperty(exports, "__esModule", { value: true });
const autoprefixer = require("autoprefixer");
const postCssPlugins = [
    autoprefixer({
        browsers: [
            'Android >= 4',
            'iOS >= 6'
        ],
        flexbox: 'no-2009'
    })
];
exports.default = [
    {
        test: /\.css$/,
        use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: postCssPlugins
                }
            }]
    }, {
        test: /\.(s[ac]ss)\b/,
        use: [{
                loader: 'style-loader',
                options: {
                    sourceMap: true
                }
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: postCssPlugins
                }
            }, {
                loader: 'sass-loader'
            }]
    }, {
        test: /\.less\b/,
        use: [{
                loader: 'style-loader',
                options: {
                    sourceMap: true
                }
            }, { loader: 'css-loader' }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: postCssPlugins
                }
            }, {
                loader: 'less-loader',
                options: {}
            }]
    }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [{
                loader: 'url-loader',
                options: {
                    name: 'assets/medias/[name]_[hash].[ext]',
                    limit: 10240
                }
            }]
    }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
                loader: 'url-loader',
                options: {
                    name: 'assets/fonts/[name]_[hash].[ext]',
                    limit: 10240
                }
            }]
    }, {
        test: /\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/,
        use: [{
                loader: 'url-loader',
                options: {
                    name: 'assets/images/[name]_[hash].[ext]',
                    limit: 10240
                }
            }]
    }
];

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_module_webpack_1 = require("nger-module-webpack");
const html_webpack_plugin_1 = tslib_1.__importDefault(require("html-webpack-plugin"));
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const path_1 = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const root = process.cwd();
const assets_1 = tslib_1.__importDefault(require("./assets"));
const nger_di_1 = require("nger-di");
let NgerWebpackAdmin = class NgerWebpackAdmin {
};
NgerWebpackAdmin = tslib_1.__decorate([
    nger_core_1.NgModule({
        providers: [{
                provide: nger_module_webpack_1.WebpackConfigToken,
                useFactory: (injector) => {
                    const dev = injector.get(nger_core_1.DevModelToken);
                    let output = {
                        path: path_1.join(root, 'template'),
                        publicPath: `/template/admin/`,
                        filename: '[name]_[hash].bound.js',
                        chunkFilename: '[name]_[hash].chunk.js'
                    };
                    if (dev) {
                        output = {
                            path: path_1.join(root, 'template'),
                            publicPath: `/`,
                            filename: '[name]_[hash].bound.js',
                            chunkFilename: '[name]_[hash].chunk.js'
                        };
                    }
                    return {
                        entry: {
                            main: [path_1.join(root, 'src/admin.ts')]
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
                            new html_webpack_plugin_1.default({
                                cache: false,
                                template: path_1.join(__dirname, 'index.html'),
                                filename: 'index.html',
                                chunks: [
                                    'manifest', 'vendors', 'main'
                                ],
                            }),
                            new webpack_1.default.WatchIgnorePlugin([
                                /\.js$/,
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
                                }, ...assets_1.default]
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
                    };
                },
                multi: true,
                deps: [nger_di_1.Injector]
            }]
    })
], NgerWebpackAdmin);
exports.NgerWebpackAdmin = NgerWebpackAdmin;
