import { NgModule } from 'nger-core';
import { WebpackConfigToken } from './providers/tokens'
@NgModule({
    providers: [{
        provide: WebpackConfigToken,
        useValue: {

        },
        multi: true
    }]
})
export class NgerModuleWebpack { }

