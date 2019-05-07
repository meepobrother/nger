"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
