"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_decorator_1 = require("ims-decorator");
const inject_1 = require("../decorators/inject");
/** 扫描生成ast */
class Scanner extends ims_decorator_1.NullAstVisitor {
}
exports.Scanner = Scanner;
/** 外观模式 提供统一的接口 用于负责多个scanner统一调用 */
let ScannerVisitor = class ScannerVisitor extends ims_decorator_1.Visitors {
    constructor(visitors) {
        super(visitors);
    }
};
ScannerVisitor = tslib_1.__decorate([
    tslib_1.__param(0, inject_1.Inject(Scanner)),
    tslib_1.__metadata("design:paramtypes", [Array])
], ScannerVisitor);
exports.ScannerVisitor = ScannerVisitor;
