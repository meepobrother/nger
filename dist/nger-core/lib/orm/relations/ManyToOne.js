Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ManyToOneMetadataKey = 'ManyToOneMetadataKey';
const factory = ims_decorator_1.makeDecorator(exports.ManyToOneMetadataKey);
function ManyToOne(typeFunction, inverseSide, options) {
    const decorator = ims_decorator_1.makeDecorator(exports.ManyToOneMetadataKey);
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
exports.ManyToOne = ManyToOne;
function isManyToOnePropertyAst(val) {
    return val.metadataKey === exports.ManyToOneMetadataKey;
}
exports.isManyToOnePropertyAst = isManyToOnePropertyAst;
class ManyToOnePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ManyToOnePropertyAst = ManyToOnePropertyAst;
