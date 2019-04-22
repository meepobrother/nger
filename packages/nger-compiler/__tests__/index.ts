import { expect } from 'chai'
import visitor from '../lib/visitor';
import { NgModule, NgModuleMetadataKey, NgModuleClassAst } from 'nger-core'
import { NgerComponents } from 'nger-components';

@NgModule({
    imports: [
        NgerComponents
    ]
})
export class App { }
const context = visitor.visitType(App)
describe('nger compiler', () => {
    it('context', () => {
        expect(context.getClass(NgModuleMetadataKey)).to.instanceOf(NgModuleClassAst)
    })
})

