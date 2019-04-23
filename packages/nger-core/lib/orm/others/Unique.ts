import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface Unique {
    name?: string;
    fields?: string[] | Fields;
}
type Fields = (object?: any) => (any[] | {
    [key: string]: number;
})
export const UniqueMetadataKey = 'UniqueMetadataKey'
export function Unique(name: string, fields: string[]): any;
export function Unique(fields: string[]): any;
export function Unique(fields: Fields): any;
export function Unique(name: string, fields: Fields): any;
export function Unique(name: any, fields?: any) {
    if (typeof name === 'function') {
        fields = name;
        name = null;
    } else if (Array.isArray(name)) {
        fields = name;
        name = null;
    }
    return makeDecorator<Unique>(UniqueMetadataKey)({
        name, fields
    });
}
export class UniqueAst extends PropertyContext<Unique>{ }
export function isUniquePropertyAst(val: PropertyAst): val is PropertyAst<Unique> {
    return val.metadataKey === UniqueMetadataKey;
}
