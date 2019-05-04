"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TerserPlugin = require('terser-webpack-plugin');
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const path_1 = require("path");
const root = process.cwd();
const target = require(path_1.join(root, 'tsconfig.json')).compilerOptions.target;
const tsTarget = typescript_1.default.ScriptTarget[target.toUpperCase()];
const util_1 = require("./util");
const supportES2015 = util_1.isDifferentialLoadingNeeded(root, tsTarget);
exports.default = {
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
                    enforce: true
                }
            },
        }
    }
};
