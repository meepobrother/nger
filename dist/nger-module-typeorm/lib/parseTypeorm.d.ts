import { TypeContext, Type } from 'ims-decorator';
export declare function parseTypeorm(context: TypeContext): {
    entities: Type<any>[];
    migrations: Type<any>[];
    subscribers: Type<any>[];
};
