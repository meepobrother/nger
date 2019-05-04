"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isType(val) {
    return typeof val === 'function';
}
exports.isType = isType;
var ChangeDetectionStrategy;
(function (ChangeDetectionStrategy) {
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
})(ChangeDetectionStrategy = exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
var ViewEncapsulation;
(function (ViewEncapsulation) {
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
})(ViewEncapsulation = exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
class QueryList {
    constructor() {
        this.dirty = true;
    }
}
exports.QueryList = QueryList;
class ActivatedRouteSnapshot {
}
exports.ActivatedRouteSnapshot = ActivatedRouteSnapshot;
class UrlSegmentGroup {
}
exports.UrlSegmentGroup = UrlSegmentGroup;
class UrlSegment {
}
exports.UrlSegment = UrlSegment;
