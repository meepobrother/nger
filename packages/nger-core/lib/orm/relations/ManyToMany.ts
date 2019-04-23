import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm'
export interface ManyToMany<T = any> {
    typeFunction: (type?: any) => ObjectType<T>,
    options: RelationOptions;
    inverseSide?: string | ((object: T) => any);
}
export const ManyToManyMetadataKey = 'ManyToManyMetadataKey'
export function ManyToMany<T>(typeFunction: (type?: any) => ObjectType<T>, options?: RelationOptions): Function;
export function ManyToMany<T>(typeFunction: (type?: any) => ObjectType<T>, inverseSide?: string | ((object: T) => any), options?: RelationOptions): Function;
export function ManyToMany(typeFunction: any, inverseSide?: any, options?: any) {
    const decorator = makeDecorator<ManyToMany>(ManyToManyMetadataKey)
    if (options) {
        return decorator({
            typeFunction,
            options,
            inverseSide
        });
    } else {
        return decorator({
            typeFunction,
            options: inverseSide
        })
    }
}
export function isManyToManyPropertyAst(val: PropertyAst): val is PropertyAst<ManyToMany> {
    return val.metadataKey === ManyToManyMetadataKey;
}
export class ManyToManyAst extends PropertyContext<ManyToMany>{ }
