import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm'
export interface OneToMany<T = any> {
    typeFunction: (type?: any) => ObjectType<T>;
    inverseSide: string | ((object: T) => any);
    options?: RelationOptions;
}
export const OneToManyMetadataKey = 'OneToManyMetadataKey'
const factory = makeDecorator<OneToMany>(OneToManyMetadataKey);
export const OneToMany = <T>(
    typeFunction: (type?: any) => ObjectType<T>,
    inverseSide: string | ((object: T) => any),
    options?: RelationOptions
) => {
    const opt: OneToMany<T> = {
        typeFunction,
        inverseSide,
        options
    }
    return factory(opt);
};
export function isOneToManyPropertyAst(val: PropertyAst): val is PropertyAst<OneToMany> {
    return val.metadataKey === OneToManyMetadataKey;
}
export class OneToManyPropertyAst extends PropertyContext<OneToMany>{ }
