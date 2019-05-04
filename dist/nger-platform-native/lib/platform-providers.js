"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("tns-core-modules/ui/page");
const nger_di_1 = require("nger-di");
const platform_1 = require("tns-core-modules/platform");
exports.DEVICE = new nger_di_1.InjectionToken("platform device");
exports.PAGE_FACTORY = new nger_di_1.InjectionToken("page factory");
let _rootPageRef;
function setRootPage(page) {
    _rootPageRef = new WeakRef(page);
}
exports.setRootPage = setRootPage;
function getRootPage() {
    return _rootPageRef && _rootPageRef.get();
}
exports.getRootPage = getRootPage;
exports.defaultPageFactory = function (_opts) {
    return new page_1.Page();
};
function getDefaultDevice() {
    return platform_1.device;
}
exports.getDefaultDevice = getDefaultDevice;
exports.defaultPageFactoryProvider = { provide: exports.PAGE_FACTORY, useValue: exports.defaultPageFactory };
exports.defaultDeviceProvider = { provide: exports.DEVICE, useFactory: getDefaultDevice };
exports.default = [exports.defaultPageFactoryProvider, exports.defaultDeviceProvider];
