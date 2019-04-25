import { ClassAst, ClassContext, TypeContext, makeDecorator } from 'ims-decorator';
export interface TypeormOptions {
    /**
     * 表
     */
    entities?: any[] | object;
    /**
     * 迁移
     */
    migrations?: any[] | object;
    /**
     * 事件
     */
    subscribers?: any[] | object;
}
export const TypeormMetadataKey = 'TypeormMetadataKey';
export const Typeorm = makeDecorator<TypeormOptions>(TypeormMetadataKey)
export function isTypeormClassAst(val: ClassAst): val is ClassAst<TypeormOptions> {
    return val.metadataKey === TypeormMetadataKey;
}
export class TypeormClassAst extends ClassContext<TypeormOptions>{
    entities: TypeContext[] = [];
    migrations: TypeContext[] = [];
    subscribers: TypeContext[] = [];

    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        if (def.entities) this.entities = this.forEachObjectToTypeContent(def.entities)
        if (def.migrations) this.migrations = this.forEachObjectToTypeContent(def.migrations)
        if (def.subscribers) this.subscribers = this.forEachObjectToTypeContent(def.subscribers)
    }
}