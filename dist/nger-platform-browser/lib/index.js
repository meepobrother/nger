"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_di_1 = require("nger-di");
require("document-register-element");
const history_1 = require("history");
const application_1 = require("./application");
const bootstrap_1 = require("./bootstrap");
const axios_1 = tslib_1.__importDefault(require("axios"));
const render_factory_1 = require("./render_factory");
exports.default = nger_core_1.createPlatformFactory(nger_core_1.platformCore, 'browser', [{
        provide: nger_core_1.NgerRenderFactory,
        useClass: render_factory_1.NgerBrowserRenderFactory,
        deps: []
    }, {
        provide: nger_core_1.Http,
        useValue: axios_1.default
    }, {
        provide: nger_core_1.ApplicationRef,
        useClass: application_1.BrowserApplicationRef,
        deps: [nger_di_1.Injector]
    }, {
        provide: nger_core_1.NgModuleBootstrap,
        useClass: bootstrap_1.NgerPlatformBrowser,
        deps: [nger_core_1.History, nger_core_1.CustomElementRegistry],
        multi: true
    }, {
        provide: nger_core_1.History,
        useValue: history_1.createBrowserHistory()
    }, {
        provide: nger_core_1.CustomElementRegistry,
        useValue: customElements
    }]);
