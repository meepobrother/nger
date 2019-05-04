const TerserPlugin = require('terser-webpack-plugin');
import ts from 'typescript';
import { join } from 'path'
const root = process.cwd();
const target: string = require(join(root, 'tsconfig.json')).compilerOptions.target;
const tsTarget = ts.ScriptTarget[target.toUpperCase()]
import { isDifferentialLoadingNeeded } from './util'
const supportES2015 = isDifferentialLoadingNeeded(root, tsTarget)
export default {
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
}