"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const rxjs_1 = require("rxjs");
let Table = class Table {
};
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], Table.prototype, "source", void 0);
tslib_1.__decorate([
    nger_core_1.Output(),
    tslib_1.__metadata("design:type", nger_core_1.EventEmitter)
], Table.prototype, "onEditor", void 0);
Table = tslib_1.__decorate([
    nger_core_1.Component({
        selector: 'nger-table'
    })
], Table);
exports.Table = Table;
