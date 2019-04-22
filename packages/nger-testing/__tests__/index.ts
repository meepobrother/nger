import transform, { It, ItMetadataKey, ItMethodAst, ItClassAst } from '../lib';

@It(`ims demo`, () => { })
export class ImsDemo {
    @It(`add 1+2 = 3`, (expect, that: ImsDemo) => {
        expect(that.add(1, 2)).to.eq(3)
    })
    add(a: number, b: number) {
        return a + b;
    }
}

const context = transform(ImsDemo);
const itAst = context.getClass(ItMetadataKey) as ItClassAst;
const itMethods = context.getMethod(ItMetadataKey) as ItMethodAst[];
import { expect } from 'chai'
const itDef = itAst.ast.metadataDef;

describe(context.target.name, () => {
    it(itDef.topic, () => {
        itDef.handler(expect, context.instance)
    });
    itMethods.map(method => {
        const def = method.ast.metadataDef;
        it(def.topic, () => {
            def.handler(expect, context.instance)
        });
    })
});

