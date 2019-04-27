import { PropertyAst, PropertyContext } from 'ims-decorator';
export const EffectMetadataKey = 'EffectMetadataKey';
export function isEffectPropertyAst(ast: PropertyAst): ast is PropertyAst<any> {
    return ast.metadataKey === EffectMetadataKey;
}
export class EffectPropertyAst extends PropertyContext<any>{ }