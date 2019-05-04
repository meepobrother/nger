"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const rxjs_1 = require("rxjs");
let ScannedActionsSubject = class ScannedActionsSubject extends rxjs_1.Subject {
    ngOnDestroy() {
        this.complete();
    }
};
ScannedActionsSubject = tslib_1.__decorate([
    nger_core_1.Injectable()
], ScannedActionsSubject);
exports.ScannedActionsSubject = ScannedActionsSubject;
exports.SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];
