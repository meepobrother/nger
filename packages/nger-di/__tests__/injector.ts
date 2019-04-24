import { Injector, ITokenString, InjectFlags } from '../lib/index'
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
        expect(res).to.instanceOf(User2)
        if (res instanceof User2) {
            expect(res.user1).to.instanceOf(User1)
        }
    })

    it(`ExistingProvider`, () => {
        class User1 { }
        class User2 { }
        const injector = new Injector([{
            provide: User1
        }, {
            provide: User2,
            useExisting: User1
        }])
        expect(injector.get(User2)).to.instanceOf(User1)
    })

    it(`ValueProvider`, () => {
        class User1 { }
        const injector = new Injector([{
            provide: User1,
            useValue: `test`
        }])
        expect(injector.get(User1)).to.equal(`test`)
    })

    it(`FactoryProviderRecord`, () => {
        class User1 {
            constructor(public id: number) { }
        }
        const idToken = `idToken` as ITokenString<string>;
        const injector = new Injector([{
            provide: idToken,
            useValue: 1
        }, {
            provide: User1,
            useFactory: (id: number) => new User1(id),
            deps: [idToken]
        }])
        const res = injector.get(User1);
        expect(res).to.instanceof(User1)
        if (res instanceof User1) {
            expect(res.id).to.equal(1)
        }
    })

    it(`StaticClassProvider`, () => {
        class User1 {
            constructor(public id: number) { }
        }
        class User2 { }
        const idToken = `idToken` as ITokenString<string>;
        const injector = new Injector([{
            provide: idToken,
            useValue: 1
        }, {
            provide: User2,
            useClass: User1,
            deps: [idToken]
        }])
        const res = injector.get(User2, InjectFlags.Default);
        expect(res).to.instanceof(User1)
        if (res instanceof User1) {
            expect(res.id).to.equal(1)
        }
        const skip = injector.get(User2, InjectFlags.SkipSelf);
        expect(skip).to.equal(undefined)
    })
})
