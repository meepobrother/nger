Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OneToManyMetadataKey = 'OneToManyMetadataKey';
const factory = ims_decorator_1.makeDecorator(exports.OneToManyMetadataKey);
exports.OneToMany = (typeFunction, inverseSide, options) => {
    const opt = {
        typeFunction,
        inverseSide,
        options
    };
    return factory(opt);
};
function isOneToManyPropertyAst(val) {
    return val.metadataKey === exports.OneToManyMetadataKey;
}
exports.isOneToManyPropertyAst = isOneToManyPropertyAst;
class OneToManyPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.OneToManyPropertyAst = OneToManyPropertyAst;
