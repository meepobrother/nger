import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm'

export interface ManyToOne<T = any> {
    typeFunction: (type?: any) => ObjectType<T>;
    inverseSide?: string | ((object: T) => any);
    options?: RelationOptions;
}
export const ManyToOneMetadataKey = 'ManyToOneMetadataKey'
const factory = makeDecorator<ManyToOne>(ManyToOneMetadataKey);
export function ManyToOne<T>(typeFunction: (type?: any) => ObjectType<T>, options?: RelationOptions): Function;
export function ManyToOne<T>(typeFunction: (type?: any) => ObjectType<T>, inverseSide?: string | ((object: T) => any), options?: RelationOptions): Function;
export function ManyToOne(typeFunction: any, inverseSide?: any, options?: any) {
    const decorator = makeDecorator<ManyToOne>(ManyToOneMetadataKey)
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
export function isManyToOnePropertyAst(val: PropertyAst): val is PropertyAst<ManyToOne> {
    return val.metadataKey === ManyToOneMetadataKey;
}
export class ManyToOnePropertyAst extends PropertyContext<ManyToOne>{ }
