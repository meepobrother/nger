import { Injector } from '../lib/index'
import { expect } from 'chai'
describe(`ims di`, () => {
    it(`ConstructorProvider`, () => {
        class User1 { }
        class User2 {
            constructor(public user1: User1) { }
        }
        const injector = new Injector([{
            provide: User1
        }, {
            provide: User2,
            deps: [User1]
        }])
        const res = injector.get(User2);
        if (Array.isArray(res)) {
            // multi
        } else {
            if (res) {
                expect(res.user1).to.instanceOf(User1)
            }
        }
    })
})
