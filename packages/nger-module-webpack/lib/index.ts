import { NgModule } from 'nger-core';
import { WebpackConfigToken } from './providers/tokens'
import { WebpackMergeService } from './providers/merge';
import { WebpackService } from './providers/webpack';
@NgModule({
    providers: [
        WebpackMergeService,
        WebpackService,
        {
            provide: WebpackConfigToken,
            useValue: {},
            multi: true
        }]
})
export class NgerModuleWebpack { }

export {
    WebpackConfigToken,
    WebpackMergeService,
    WebpackService
}