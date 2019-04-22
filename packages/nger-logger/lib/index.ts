import { NgModule } from 'nger-core';
import { Logger } from './logger';
import { ConsoleLogger, LogLevel } from './console';

export * from './console';
export * from './logger';

@NgModule({
    providers: [{
        provide: Logger,
        useFactory: (level: LogLevel) => {
            return new ConsoleLogger(level);
        },
        deps: [LogLevel.debug]
    }]
})
export class NgerLoggerModule { }
