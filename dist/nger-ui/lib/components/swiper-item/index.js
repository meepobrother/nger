"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const base_1 = require("../base");
let SwiperItem = class SwiperItem extends base_1.Element {
};
tslib_1.__decorate([
    nger_core_1.Input(),
    tslib_1.__metadata("design:type", String)
], SwiperItem.prototype, "itemId", void 0);
SwiperItem = tslib_1.__decorate([
    nger_core_1.Component({
        selector: 'nger-swiper-item'
    })
], SwiperItem);
exports.SwiperItem = SwiperItem;
