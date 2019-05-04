import { Type } from 'ims-decorator';
export declare function createTypeormConfig(typeorms: Type<any>[]): {
    entities: Type<any>[];
    subscribers: Type<any>[];
    migrations: Type<any>[];
};
