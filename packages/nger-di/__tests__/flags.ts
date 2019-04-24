import { OptionFlags, InjectFlags } from '../lib/injector';

// CheckParent = 0;Optional = 0;
export function isCheckSelf(options: OptionFlags) {
    return options & OptionFlags.CheckSelf
}
// CheckSelf = 0; Optional = 0;
export function isCheckParent(options: OptionFlags) {
    return options & OptionFlags.CheckParent
}
// Optional = 0;
export function isDefault(options: OptionFlags) {
    return options & OptionFlags.Default
}
// CheckParent =0;CheckSelf=0;Default=0;
export function isOptional(options: OptionFlags) {
    return options & OptionFlags.Optional
}
import { expect } from 'chai';
describe(`flags`, () => {
    it(`CheckSelf 当CheckParent和Optional为0，其余不为0`, () => {
        // 当CheckParent和Optional 为0
        expect(OptionFlags.Optional & OptionFlags.CheckSelf).to.eq(0)
        expect(OptionFlags.CheckParent & OptionFlags.CheckSelf).to.eq(0)
        expect(OptionFlags.CheckSelf & OptionFlags.CheckSelf).to.not.eq(0)
        expect(OptionFlags.Default & OptionFlags.CheckSelf).to.not.eq(0)
    })
    it(`CheckParent 当CheckSelf和Optional为0，其余不为0`, () => {
        expect(OptionFlags.CheckSelf & OptionFlags.CheckParent).to.eq(0)
        expect(OptionFlags.Optional & OptionFlags.CheckParent).to.eq(0)

        expect(OptionFlags.CheckParent & OptionFlags.CheckParent).to.not.eq(0)
        expect(OptionFlags.Default & OptionFlags.CheckParent).to.not.eq(0)
    })
    it(`Default 当Optional为0，其余不为0`, () => {
        expect(OptionFlags.Optional & OptionFlags.Default).to.eq(0)
        expect(OptionFlags.CheckSelf & OptionFlags.Default).to.not.eq(0)
        expect(OptionFlags.CheckParent & OptionFlags.Default).to.not.eq(0)
        expect(OptionFlags.Default & OptionFlags.Default).to.not.eq(0)
    })
    it(`Optional 当Optional不为0其余为0`, () => {
        expect(OptionFlags.Optional & OptionFlags.Optional).to.not.eq(0)
        expect(OptionFlags.CheckSelf & OptionFlags.Optional).to.eq(0)
        expect(OptionFlags.CheckParent & OptionFlags.Optional).to.eq(0)
        expect(OptionFlags.Default & OptionFlags.Optional).to.eq(0)
    })
})
