import { PropertyAst, PropertyContext } from 'ims-decorator';
export declare const EffectMetadataKey = "EffectMetadataKey";
export declare function isEffectPropertyAst(ast: PropertyAst): ast is PropertyAst<any>;
export declare class EffectPropertyAst extends PropertyContext<any> {
}
