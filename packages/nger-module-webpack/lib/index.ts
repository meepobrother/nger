import { NgModule, DevModelToken } from 'nger-core';
import { WebpackConfigToken } from './providers/tokens'
import { WebpackMergeService } from './providers/merge';
import { WebpackService } from './providers/webpack';
import { Configuration } from 'webpack'
@NgModule({
    providers: [
        WebpackMergeService,
        WebpackService,
        {
            provide: WebpackConfigToken,
            useFactory: (dev: boolean) => {
                return {
                    mode: dev ? 'development' : 'production',
                    plugins: []
                } as Configuration
            },
            deps: [
                DevModelToken
            ],
            multi: true
        }]
})
export class NgerModuleWebpack { }

export {
    WebpackConfigToken,
    WebpackMergeService,
    WebpackService
}