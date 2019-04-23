import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm'
export interface OneToOne<T = any> {
    typeFunction: (type?: any) => ObjectType<T>;
    inverseSide?: string | ((object: T) => any);
    options?: RelationOptions;
}
export const OneToOneMetadataKey = 'OneToOneMetadataKey'
export function OneToOne<T>(typeFunction: (type?: any) => ObjectType<T>, options?: RelationOptions): Function;
export function OneToOne<T>(typeFunction: (type?: any) => ObjectType<T>, inverseSide?: string | ((object: T) => any), options?: RelationOptions): Function;
export function OneToOne(typeFunction: any, inverseSide?: any, options?: any) {
    const decorator = makeDecorator<OneToOne>(OneToOneMetadataKey)
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
export function isOneToOnePropertyAst(val: PropertyAst): val is PropertyAst<OneToOne> {
    return val.metadataKey === OneToOneMetadataKey;
}
export class OneToOnePropertyAst extends PropertyContext<OneToOne>{ }
