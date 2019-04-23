import {
    isType,
    makeDecorator,
    getContext,
    isClassAst,
    isPropertyAst
} from '../lib/index';
import { expect } from 'chai'
class ImsDemo { }
describe('ims-decorator', () => {
    it('isType', () => {
        expect(isType(ImsDemo)).to.equal(true)
    })
    it('makeDecorator', () => {
        const common = makeDecorator('common');
        const res = common()(ImsDemo);
        const context = getContext(res);
        if (context) {
            const commonAsts = context.getClassAst('common');
            expect(commonAsts.length).to.equal(1);
            const commonAst = commonAsts[0]
            expect(commonAst.metadataKey).to.equal('common');
            expect(isClassAst(commonAst)).to.equal(true)
            @common()
            class Demo2 {
                @common()
                id: string;
            }
            const demo2Context = getContext(Demo2);
            if (demo2Context) {
                expect(demo2Context.propertys.every(it => isPropertyAst(it))).to.equal(true)
            }
        }
    })
});