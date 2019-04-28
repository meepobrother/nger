import { createPlatformFactory } from './createPlatformFactory';
import { ParserVisitor, Parser, DefaultParser } from './parser_visitor'
import { ScannerVisitor, Scanner } from './scanner_visitor'
import { Injector } from 'nger-di';
import { Logger, ConsoleLogger, NgerConfig, LoggerLevel } from '../sdk'
import { OrmVisitor } from '../orm'
import { NgVisitor } from '../visitor'
import { PlatformRef, CompilerFactory } from './platform_ref'
import { ErrorHandler, DefaultErrorHandler } from './error_handler'
import { APP_INITIALIZER, ApplicationInitStatus } from './application_init_status'
import { ALLOW_MULTIPLE_PLATFORMS } from './createPlatform';
export const platformCore = createPlatformFactory(null, 'core', [{
    provide: ALLOW_MULTIPLE_PLATFORMS,
    useValue: true
}, {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: (app: ApplicationInitStatus) => {
        return () => {
            return app.runInitializers();
        }
    },
    deps: [ApplicationInitStatus]
}, {
    provide: ErrorHandler,
    useClass: DefaultErrorHandler,
    deps: [Logger]
}, {
    provide: Parser,
    useClass: DefaultParser,
    multi: true,
    deps: []
}, {
    provide: PlatformRef,
    deps: [Injector]
}, {
    provide: CompilerFactory,
    deps: []
}, {
    provide: Scanner,
    useValue: new NgVisitor(),
    multi: true
}, {
    provide: Scanner,
    useValue: new OrmVisitor(),
    multi: true
}, {
    provide: ParserVisitor,
    useFactory: (injector: Injector) => {
        const parser = injector.get<Parser[]>(Parser);
        return new ParserVisitor(parser)
    },
    deps: [Injector]
}, {
    provide: ScannerVisitor,
    useFactory: (injector: Injector) => {
        const scanner = injector.get<Scanner[]>(Scanner);
        return new ScannerVisitor(scanner)
    },
    deps: [Injector]
}, {
    provide: NgerConfig,
    useFactory: () => {
        const config = new NgerConfig();
        config.watch = true;
        config.loggerLevel = LoggerLevel.debug;
    },
    deps: [],
    multi: true
}, {
    provide: Logger,
    useFactory: (config: NgerConfig) => {
        return new ConsoleLogger(config.loggerLevel)
    },
    deps: [NgerConfig]
}]);
