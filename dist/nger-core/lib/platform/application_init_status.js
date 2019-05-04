"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lang_1 = require("./lang");
const inject_1 = require("../decorators/inject");
const injectable_1 = require("../decorators/injectable");
const optional_1 = require("../decorators/optional");
const nger_di_1 = require("nger-di");
// import { APP_INITIALIZER } from './application_tokens'
exports.APP_INITIALIZER = new nger_di_1.InjectionToken('Application Initializer');
let ApplicationInitStatus = class ApplicationInitStatus {
    constructor(appInits) {
        this.appInits = appInits;
        this.initialized = false;
        this.done = false;
        this.donePromise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
    /** @internal */
    runInitializers() {
        if (this.initialized) {
            return;
        }
        const asyncInitPromises = [];
        const complete = () => {
            this.done = true;
            this.resolve();
        };
        if (this.appInits) {
            for (let i = 0; i < this.appInits.length; i++) {
                const initResult = this.appInits[i]();
                if (lang_1.isPromise(initResult)) {
                    asyncInitPromises.push(initResult);
                }
            }
        }
        Promise.all(asyncInitPromises).then(() => { complete(); }).catch(e => { this.reject(e); });
        if (asyncInitPromises.length === 0) {
            complete();
        }
        this.initialized = true;
    }
};
ApplicationInitStatus = tslib_1.__decorate([
    injectable_1.Injectable(),
    tslib_1.__param(0, inject_1.Inject(exports.APP_INITIALIZER)), tslib_1.__param(0, optional_1.Optional()),
    tslib_1.__metadata("design:paramtypes", [Array])
], ApplicationInitStatus);
exports.ApplicationInitStatus = ApplicationInitStatus;
