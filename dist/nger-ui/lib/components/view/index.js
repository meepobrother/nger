"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const base_1 = require("../base");
let View = class View extends base_1.Element {
};
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", String)
], View.prototype, "hoverClass", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Boolean)
], View.prototype, "hoverStopPropagation", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Number)
], View.prototype, "hoverStartTime", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Number)
], View.prototype, "hoverStayTime", void 0);
View = tslib_1.__decorate([
    nger_core_1.Component({
        selector: 'view'
    })
], View);
exports.View = View;
