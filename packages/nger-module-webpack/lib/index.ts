import { NgModule } from 'nger-core';
import { WebpackConfigToken } from './providers/tokens'
import { WebpackMergeService } from './providers/merge';
import { WebpackService } from './providers/webpack';
import { Configuration } from 'webpack'
import { join } from 'path';
const StatsPlugin = require('stats-webpack-plugin');
const root = process.cwd();

@NgModule({
    providers: [
        WebpackMergeService,
        WebpackService,
        {
            provide: WebpackConfigToken,
            useValue: {
                mode: 'development',
                entry: join(root, 'src/admin.ts'),
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.jsx'],
                    mainFields: ['main:h5', 'main', 'module'],
                    symlinks: true,
                    modules: [join(root, 'packages'), join(root, 'node_modules')]
                },
                profile: true,
                recordsPath: join(root, 'data/webpack/admin.json'),
                plugins: [
                    new StatsPlugin('stats.json', {
                        chunkModules: true
                    })
                ],
                optimization: {
                    minimizer: []
                }
            } as Configuration,
            multi: true
        }]
})
export class NgerModuleWebpack { }

export {
    WebpackConfigToken,
    WebpackMergeService,
    WebpackService
}