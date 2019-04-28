import { NgModule } from 'nger-core'
import { NgerPm2Service } from './providers/pm2';
import { Logger, ConsoleLogger, LogLevel } from 'nger-logger';
import { NgerUtil } from 'nger-util';

@NgModule({
    providers: [
        NgerPm2Service,
        {
            provide: Logger,
            useFactory: () => {
                return new ConsoleLogger(LogLevel.debug)
            },
            deps: []
        }, NgerUtil
    ]
})
export class NgerModulePm2 { }
export { NgerPm2Service };