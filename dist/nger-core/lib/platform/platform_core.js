"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createPlatformFactory_1 = require("./createPlatformFactory");
const parser_visitor_1 = require("./parser_visitor");
const scanner_visitor_1 = require("./scanner_visitor");
const nger_di_1 = require("nger-di");
const sdk_1 = require("../sdk");
const orm_1 = require("../orm");
const visitor_1 = require("../visitor");
const platform_ref_1 = require("./platform_ref");
const error_handler_1 = require("./error_handler");
const application_init_status_1 = require("./application_init_status");
const createPlatform_1 = require("./createPlatform");
const change_detector_ref_1 = require("./change_detector_ref");
const application_ref_1 = require("./application_ref");
const component_factory_1 = require("./component_factory");
const application_tokens_1 = require("./application_tokens");
const nger_config_1 = require("../sdk/nger-config");
const rxjs_1 = require("rxjs");
exports.topSubject = new rxjs_1.BehaviorSubject({});
exports.platformCore = createPlatformFactory_1.createPlatformFactory(null, 'core', [{
        provide: application_init_status_1.APP_INITIALIZER,
        useValue: () => { },
        deps: [],
        multi: true
    }, {
        provide: application_tokens_1.PLATFORM_INITIALIZER,
        useValue: () => { },
        deps: [],
        multi: true
    }, {
        provide: component_factory_1.ComponentCreator,
        multi: true,
        useValue: (val) => val,
    }, {
        provide: application_init_status_1.ApplicationInitStatus,
        useClass: application_init_status_1.ApplicationInitStatus,
        deps: [
            [nger_di_1.InjectFlags.Optional, application_init_status_1.APP_INITIALIZER]
        ]
    }, {
        provide: application_ref_1.ApplicationRef,
        useClass: application_ref_1.ApplicationRef,
        deps: [nger_di_1.Injector]
    }, {
        provide: change_detector_ref_1.ChangeDetectorRef,
        useValue: new change_detector_ref_1.DefaultChangeDetectorRef(exports.topSubject),
        multi: false
    }, {
        provide: createPlatform_1.ALLOW_MULTIPLE_PLATFORMS,
        useValue: true
    }, {
        provide: error_handler_1.ErrorHandler,
        useClass: error_handler_1.DefaultErrorHandler,
        deps: [sdk_1.Logger]
    }, {
        provide: parser_visitor_1.Parser,
        useClass: parser_visitor_1.DefaultParser,
        multi: true,
        deps: [nger_di_1.Injector]
    }, {
        provide: platform_ref_1.PlatformRef,
        deps: [nger_di_1.Injector]
    }, {
        provide: platform_ref_1.CompilerFactory,
        deps: []
    }, {
        provide: scanner_visitor_1.Scanner,
        useValue: new visitor_1.NgVisitor(),
        multi: true
    }, {
        provide: scanner_visitor_1.Scanner,
        useValue: new orm_1.OrmVisitor(),
        multi: true
    }, {
        provide: parser_visitor_1.ParserVisitor,
        useFactory: (injector) => {
            const parser = injector.get(parser_visitor_1.Parser);
            return new parser_visitor_1.ParserVisitor(parser);
        },
        deps: [nger_di_1.Injector]
    }, {
        provide: scanner_visitor_1.ScannerVisitor,
        useFactory: (injector) => {
            const scanner = injector.get(scanner_visitor_1.Scanner);
            return new scanner_visitor_1.ScannerVisitor(scanner);
        },
        deps: [nger_di_1.Injector]
    }, {
        provide: nger_config_1.NGER_CONFIG,
        useValue: {},
        multi: true
    }, {
        provide: sdk_1.NgerConfig,
        useFactory: (config) => {
            return new sdk_1.NgerConfig(config || []);
        },
        deps: [nger_config_1.NGER_CONFIG]
    }, {
        provide: sdk_1.Logger,
        useFactory: (config) => {
            return new sdk_1.ConsoleLogger(config.get('loggerLevel') || sdk_1.LoggerLevel.debug);
        },
        deps: [sdk_1.NgerConfig]
    }]);
