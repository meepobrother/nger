Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PrimaryGeneratedColumnMetadataKey = 'PrimaryGeneratedColumnMetadataKey';
function PrimaryGeneratedColumn(strategy, options) {
    const decorator = ims_decorator_1.makeDecorator(exports.PrimaryGeneratedColumnMetadataKey);
    return decorator({
        strategy,
        options
    });
}
exports.PrimaryGeneratedColumn = PrimaryGeneratedColumn;
function isPrimaryGeneratedColumnPropertyAst(val) {
    return val.metadataKey === exports.PrimaryGeneratedColumnMetadataKey;
}
exports.isPrimaryGeneratedColumnPropertyAst = isPrimaryGeneratedColumnPropertyAst;
class PrimaryGeneratedColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.PrimaryGeneratedColumnPropertyAst = PrimaryGeneratedColumnPropertyAst;
