Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const index_1 = require("../lib/index");
const chai_1 = require("chai");
class ImsDemo {
}
describe('ims-decorator', () => {
    it(`getDesignParamTypes`, () => {
        function Demo() {
            return (target) => { };
        }
        let ImsDemo2 = class ImsDemo2 {
            constructor(id) {
                this.id = id;
            }
            add(a, b) { }
        };
        ImsDemo2 = tslib_1.__decorate([
            Demo(),
            tslib_1.__metadata("design:paramtypes", [Number])
        ], ImsDemo2);
        const res = Reflect.getMetadata('design:paramtypes', ImsDemo2);
        debugger;
    });
    it('isType', () => {
        chai_1.expect(index_1.isType(ImsDemo)).to.equal(true);
    });
    it('makeDecorator', () => {
        const common = index_1.makeDecorator('common');
        const res = common()(ImsDemo);
        const context = index_1.getContext(res);
        if (context) {
            const commonAsts = context.getClassAst('common');
            chai_1.expect(commonAsts.length).to.equal(1);
            const commonAst = commonAsts[0];
            chai_1.expect(commonAst.metadataKey).to.equal('common');
            chai_1.expect(index_1.isClassAst(commonAst)).to.equal(true);
            let Demo2 = class Demo2 {
            };
            tslib_1.__decorate([
                common(),
                tslib_1.__metadata("design:type", String)
            ], Demo2.prototype, "id", void 0);
            Demo2 = tslib_1.__decorate([
                common()
            ], Demo2);
            const demo2Context = index_1.getContext(Demo2);
            if (demo2Context) {
                chai_1.expect(demo2Context.propertys.every(it => index_1.isPropertyAst(it))).to.equal(true);
            }
        }
    });
});
