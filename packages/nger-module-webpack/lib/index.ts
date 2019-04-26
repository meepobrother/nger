import { NgModule, DevModelToken } from 'nger-core';
import { WebpackConfigToken } from './providers/tokens'
import { WebpackMergeService } from './providers/merge';
import { WebpackService } from './providers/webpack';
import { Configuration } from 'webpack'
import { join } from 'path';
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
                plugins: []
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