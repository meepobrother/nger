import { createPlatformFactory } from './createPlatformFactory';
import { ParserVisitor, Parser, DefaultParser } from './parser_visitor'
import { ScannerVisitor, Scanner } from './scanner_visitor'
import { Injector, InjectFlags } from 'nger-di';
import { Logger, ConsoleLogger, NgerConfig, LoggerLevel } from '../sdk'
import { OrmVisitor } from '../orm'
import { NgVisitor } from '../visitor'
import { PlatformRef, CompilerFactory } from './platform_ref'
import { ErrorHandler, DefaultErrorHandler } from './error_handler'
import { APP_INITIALIZER, ApplicationInitStatus } from './application_init_status'
import { ALLOW_MULTIPLE_PLATFORMS } from './createPlatform';
import { ChangeDetectorRef, DefaultChangeDetectorRef } from './change_detector_ref'
import { ApplicationRef } from './application_ref'
import { ComponentCreator } from './component_factory'
import { PLATFORM_INITIALIZER } from './application_tokens'
import { NGER_CONFIG, INgerConfig } from '../sdk/nger-config'
import { Subject } from 'rxjs'
export const topSubject = new Subject();
export const platformCore = createPlatformFactory(null, 'core', [{
    provide: APP_INITIALIZER,
    useValue: () => { },
    deps: [],
    multi: true
}, {
    provide: PLATFORM_INITIALIZER,
    useValue: () => { },
    deps: [],
    multi: true
}, {
    provide: ComponentCreator,
    multi: true,
    useValue: (val) => val,
}, {
    provide: ApplicationInitStatus,
    useClass: ApplicationInitStatus,
    deps: [
        [InjectFlags.Optional, APP_INITIALIZER]
    ]
}, {
    provide: ApplicationRef,
    useClass: ApplicationRef,
    deps: [Injector]
}, {
    provide: ChangeDetectorRef,
    useValue: new DefaultChangeDetectorRef(topSubject),
    multi: false
}, {
    provide: ALLOW_MULTIPLE_PLATFORMS,
    useValue: true
}, {
    provide: ErrorHandler,
    useClass: DefaultErrorHandler,
    deps: [Logger]
}, {
    provide: Parser,
    useClass: DefaultParser,
    multi: true,
    deps: [Injector]
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
    provide: NGER_CONFIG,
    useValue: {},
    multi: true
}, {
    provide: NgerConfig,
    useFactory: (config: INgerConfig[]) => {
        return new NgerConfig(config || []);
    },
    deps: [NGER_CONFIG]
}, {
    provide: Logger,
    useFactory: (config: NgerConfig) => {
        return new ConsoleLogger(config.get('loggerLevel') as LoggerLevel || LoggerLevel.debug)
    },
    deps: [NgerConfig]
}]);
