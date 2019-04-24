import "reflect-metadata"
import {
    isType,
    makeDecorator,
    getContext,
    isClassAst,
    isPropertyAst,
    getDesignParamTypes
} from '../lib/index';
import { expect } from 'chai'
class ImsDemo { }
describe('ims-decorator', () => {
    it(`getDesignParamTypes`, () => {
        function Demo() {
            return (target: any) => { }
        }
        @Demo()
        class ImsDemo2 {
            constructor(public id: number) { }
            add(a: number, b: number) { }
        }
        const res = Reflect.getMetadata('design:paramtypes', ImsDemo2);

        debugger;
    })
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