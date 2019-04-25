import { NgModule } from 'nger-core';
import { NgerUtil } from 'nger-util'
import { Logger } from 'nger-logger'
import { NgerGulpService } from './providers/gulp';

@NgModule({
    providers: [NgerGulpService, {
        provide: NgerUtil,
        useFactory: (logger: Logger) => {
            return new NgerUtil(logger)
        },
        deps: [Logger]
    }]
})
export class NgerModuleGulp { }
