Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ManyToManyMetadataKey = 'ManyToManyMetadataKey';
function ManyToMany(typeFunction, inverseSide, options) {
    const decorator = ims_decorator_1.makeDecorator(exports.ManyToManyMetadataKey);
    if (options) {
        return decorator({
            typeFunction,
            options,
            inverseSide
        });
    }
    else {
        return decorator({
            typeFunction,
            options: inverseSide
        });
    }
}
exports.ManyToMany = ManyToMany;
function isManyToManyPropertyAst(val) {
    return val.metadataKey === exports.ManyToManyMetadataKey;
}
exports.isManyToManyPropertyAst = isManyToManyPropertyAst;
class ManyToManyPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ManyToManyPropertyAst = ManyToManyPropertyAst;
