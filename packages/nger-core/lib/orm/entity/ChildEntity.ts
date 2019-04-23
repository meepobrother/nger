import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export interface ChildEntity {
    discriminatorValue?: any
}
export const ChildEntityMetadataKey = 'ChildEntityMetadataKey'
export const ChildEntity = (discriminatorValue?: any) => makeDecorator<ChildEntity>(ChildEntityMetadataKey)({
    discriminatorValue
});
export function isChildEntityClassAst(val: ClassAst): val is ClassAst<ChildEntity> {
    return val.metadataKey === ChildEntityMetadataKey;
}
export class ChildEntityClassAst extends ClassContext<ChildEntity>{ }
