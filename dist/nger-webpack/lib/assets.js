"use strict";
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
