Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const chai_1 = require("chai");
describe(`ims di`, () => {
    it(`ConstructorProvider`, () => {
        class User1 {
        }
        class User2 {
            constructor(user1) {
                this.user1 = user1;
            }
        }
        const injector = index_1.Injector.create([{
                provide: User1
            }, {
                provide: User2,
                deps: [User1]
            }]);
        const res = injector.get(User2);
        chai_1.expect(res).to.instanceOf(User2);
        if (res instanceof User2) {
            chai_1.expect(res.user1).to.instanceOf(User1);
        }
    });
    it(`ExistingProvider`, () => {
        class User1 {
        }
        class User2 {
        }
        const injector = index_1.Injector.create([{
                provide: User1
            }, {
                provide: User2,
                useExisting: User1
            }]);
        chai_1.expect(injector.get(User2)).to.instanceOf(User1);
    });
    it(`ValueProvider`, () => {
        class User1 {
        }
        const injector = index_1.Injector.create([{
                provide: User1,
                useValue: `test`
            }]);
        chai_1.expect(injector.get(User1)).to.equal(`test`);
    });
    it(`FactoryProviderRecord`, () => {
        class User1 {
            constructor(id) {
                this.id = id;
            }
        }
        const idToken = `idToken`;
        const injector = index_1.Injector.create([{
                provide: idToken,
                useValue: 1
            }, {
                provide: User1,
                useFactory: (id) => new User1(id),
                deps: [idToken]
            }]);
        const res = injector.get(User1);
        chai_1.expect(res).to.instanceof(User1);
        if (res instanceof User1) {
            chai_1.expect(res.id).to.equal(1);
        }
    });
    it(`StaticClassProvider`, () => {
        class User1 {
            constructor(id) {
                this.id = id;
            }
        }
        class User2 {
        }
        const idToken = `idToken`;
        const injector = index_1.Injector.create([{
                provide: idToken,
                useValue: 1
            }, {
                provide: User2,
                useClass: User1,
                deps: [idToken]
            }]);
        const res = injector.get(User2, index_1.InjectFlags.Default);
        chai_1.expect(res).to.instanceof(User1);
        if (res instanceof User1) {
            chai_1.expect(res.id).to.equal(1);
        }
        const skip = injector.get(User2, index_1.InjectFlags.SkipSelf);
        chai_1.expect(skip).to.equal(undefined);
    });
});
