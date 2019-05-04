"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const base_1 = require("../base");
let Swiper = class Swiper extends base_1.Element {
};
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Boolean)
], Swiper.prototype, "indicatorDots", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", String)
], Swiper.prototype, "indicatorColor", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", String)
], Swiper.prototype, "indicatorActiveColor", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Boolean)
], Swiper.prototype, "autoplay", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Number)
], Swiper.prototype, "current", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Number)
], Swiper.prototype, "interval", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Number)
], Swiper.prototype, "duration", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Boolean)
], Swiper.prototype, "circular", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Boolean)
], Swiper.prototype, "vertical", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", String)
], Swiper.prototype, "previousMargin", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", String)
], Swiper.prototype, "nextMargin", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Number)
], Swiper.prototype, "displayMultipleItems", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", Boolean)
], Swiper.prototype, "skipHiddenItemLayout", void 0);
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", String)
], Swiper.prototype, "easingFunction", void 0);
tslib_1.__decorate([
    nger_core_1.Output(),
    tslib_1.__metadata("design:type", Function)
], Swiper.prototype, "change", void 0);
tslib_1.__decorate([
    nger_core_1.Output(),
    tslib_1.__metadata("design:type", Function)
], Swiper.prototype, "transition", void 0);
tslib_1.__decorate([
    nger_core_1.Output(),
    tslib_1.__metadata("design:type", Function)
], Swiper.prototype, "animationfinish", void 0);
Swiper = tslib_1.__decorate([
    nger_core_1.Component({
        selector: 'nger-swiper'
    })
], Swiper);
exports.Swiper = Swiper;
