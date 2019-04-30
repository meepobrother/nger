Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inject_1 = require("../decorators/inject");
const index_1 = require("../orm/index");
const tokens_1 = require("../tokens");
/** 解析器 */
class Parser {
}
exports.Parser = Parser;
class DefaultParser extends Parser {
    parse(instance, context) {
        const injects = context.getProperty(inject_1.InjectMetadataKey);
        injects.map(inject => {
            const { metadataDef, propertyKey, propertyType } = inject.ast;
            instance[propertyKey] = context.injector.get(metadataDef.token || propertyType);
        });
        // entity
        const entities = context.getProperty(index_1.EntityRepositoryMetadataKey);
        entities.map(entity => {
            const { metadataDef, propertyKey } = entity.ast;
            setTimeout(() => {
                const connection = context.injector.get(tokens_1.ConnectionToken);
                instance[propertyKey] = connection.getRepository(metadataDef.entity);
            }, 0);
        });
        return instance;
    }
}
exports.DefaultParser = DefaultParser;
/** 外观模式 提供统一接口 */
let ParserVisitor = class ParserVisitor extends Parser {
    constructor(allParser) {
        super();
        this.allParser = allParser;
    }
    parse(instance, context) {
        for (let item of this.allParser) {
            item.parse(instance, context);
        }
        return instance;
    }
};
ParserVisitor = tslib_1.__decorate([
    tslib_1.__param(0, inject_1.Inject(Parser)),
    tslib_1.__metadata("design:paramtypes", [Array])
], ParserVisitor);
exports.ParserVisitor = ParserVisitor;
