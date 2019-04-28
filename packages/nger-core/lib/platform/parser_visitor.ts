import { TypeContext } from 'ims-decorator'
import { Inject, InjectMetadataKey, InjectPropertyAst } from '../decorators/inject'
import { createTypeProvider } from './createStaticProvider'
import { EntityRepositoryMetadataKey, EntityRepositoryPropertyAst } from '../orm/index';
import { ConnectionToken } from '../tokens';
import { Connection } from 'typeorm'
/** 解析器 */
export abstract class Parser {
    abstract parse<T>(instance: T, context: TypeContext): T;
}
export class DefaultParser extends Parser {
    parse<T>(instance: T, context: TypeContext): T {
        const injects = context.getProperty(InjectMetadataKey) as InjectPropertyAst[];
        injects.map(inject => {
            const { metadataDef, propertyKey, propertyType } = inject.ast;
            instance[propertyKey] = context.injector.get(metadataDef.token || propertyType)
        });
        // entity
        const entities = context.getProperty(EntityRepositoryMetadataKey) as EntityRepositoryPropertyAst[];
        entities.map(entity => {
            const { metadataDef, propertyKey } = entity.ast;
            setTimeout(() => {
                const connection = context.injector.get(ConnectionToken) as Connection;
                instance[propertyKey] = connection.getRepository(metadataDef.entity);
            }, 0);
        });
        return instance;
    }
}
/** 外观模式 提供统一接口 */
export class ParserVisitor extends Parser {
    constructor(@Inject(Parser) public allParser: Parser[]) {
        super()
    }
    parse<T>(instance: T, context: TypeContext): T {
        for (let item of this.allParser) {
            item.parse<T>(instance, context);
        }
        return instance
    }
}
