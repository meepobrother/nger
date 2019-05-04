"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
// CheckParent = 0;Optional = 0;
function isCheckSelf(options) {
    return options & lib_1.OptionFlags.CheckSelf;
}
exports.isCheckSelf = isCheckSelf;
// CheckSelf = 0; Optional = 0;
function isCheckParent(options) {
    return options & lib_1.OptionFlags.CheckParent;
}
exports.isCheckParent = isCheckParent;
// Optional = 0;
function isDefault(options) {
    return options & lib_1.OptionFlags.Default;
}
exports.isDefault = isDefault;
// CheckParent =0;CheckSelf=0;Default=0;
function isOptional(options) {
    return options & lib_1.OptionFlags.Optional;
}
exports.isOptional = isOptional;
const chai_1 = require("chai");
describe(`flags`, () => {
    it(`CheckSelf 当CheckParent和Optional为0，其余不为0`, () => {
        // 当CheckParent和Optional 为0
        chai_1.expect(lib_1.OptionFlags.Optional & lib_1.OptionFlags.CheckSelf).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckParent & lib_1.OptionFlags.CheckSelf).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckSelf & lib_1.OptionFlags.CheckSelf).to.not.eq(0);
        chai_1.expect(lib_1.OptionFlags.Default & lib_1.OptionFlags.CheckSelf).to.not.eq(0);
    });
    it(`CheckParent 当CheckSelf和Optional为0，其余不为0`, () => {
        chai_1.expect(lib_1.OptionFlags.CheckSelf & lib_1.OptionFlags.CheckParent).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.Optional & lib_1.OptionFlags.CheckParent).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckParent & lib_1.OptionFlags.CheckParent).to.not.eq(0);
        chai_1.expect(lib_1.OptionFlags.Default & lib_1.OptionFlags.CheckParent).to.not.eq(0);
    });
    it(`Default 当Optional为0，其余不为0`, () => {
        chai_1.expect(lib_1.OptionFlags.Optional & lib_1.OptionFlags.Default).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckSelf & lib_1.OptionFlags.Default).to.not.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckParent & lib_1.OptionFlags.Default).to.not.eq(0);
        chai_1.expect(lib_1.OptionFlags.Default & lib_1.OptionFlags.Default).to.not.eq(0);
    });
    it(`Optional 当Optional不为0其余为0`, () => {
        chai_1.expect(lib_1.OptionFlags.Optional & lib_1.OptionFlags.Optional).to.not.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckSelf & lib_1.OptionFlags.Optional).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckParent & lib_1.OptionFlags.Optional).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.Default & lib_1.OptionFlags.Optional).to.eq(0);
    });
});
