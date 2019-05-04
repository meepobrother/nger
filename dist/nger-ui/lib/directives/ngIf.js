"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const base_1 = require("../components/base");
let NgIf = class NgIf extends base_1.Element {
};
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Boolean)
], NgIf.prototype, "condiction", void 0);
NgIf = tslib_1.__decorate([
    nger_core_1.Directive({
        selector: 'ngIf'
    })
], NgIf);
exports.NgIf = NgIf;
