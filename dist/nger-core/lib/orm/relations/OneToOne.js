"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OneToOneMetadataKey = 'OneToOneMetadataKey';
function OneToOne(typeFunction, inverseSide, options) {
    const decorator = ims_decorator_1.makeDecorator(exports.OneToOneMetadataKey);
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
exports.OneToOne = OneToOne;
function isOneToOnePropertyAst(val) {
    return val.metadataKey === exports.OneToOneMetadataKey;
}
exports.isOneToOnePropertyAst = isOneToOnePropertyAst;
class OneToOnePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.OneToOnePropertyAst = OneToOnePropertyAst;
