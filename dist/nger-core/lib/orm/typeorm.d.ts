import { ClassAst, ClassContext, TypeContext } from 'ims-decorator';
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
export declare const TypeormMetadataKey = "TypeormMetadataKey";
export declare const Typeorm: {
    (opt?: TypeormOptions): any;
    (opt?: TypeormOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: TypeormOptions): any;
};
export declare function isTypeormClassAst(val: ClassAst): val is ClassAst<TypeormOptions>;
export declare class TypeormClassAst extends ClassContext<TypeormOptions> {
    entities: TypeContext[];
    migrations: TypeContext[];
    subscribers: TypeContext[];
    constructor(ast: any, context: any);
}
