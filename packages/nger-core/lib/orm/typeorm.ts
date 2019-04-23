import { ClassAst, ClassContext } from 'ims-decorator';
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
export function isTypeormClassAst(val: ClassAst): val is ClassAst<TypeormOptions> {
    return val.metadataKey === TypeormMetadataKey;
}
export class TypeormClassAst extends ClassContext<TypeormOptions>{ }