"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
class VoidElement {
}
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", String)
], VoidElement.prototype, "className", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Object)
], VoidElement.prototype, "style", void 0);
exports.VoidElement = VoidElement;
class Element extends VoidElement {
}
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", String)
], Element.prototype, "className", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Object)
], Element.prototype, "style", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Array)
], Element.prototype, "children", void 0);
exports.Element = Element;
