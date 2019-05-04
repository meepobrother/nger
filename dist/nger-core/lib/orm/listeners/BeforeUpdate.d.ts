import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface BeforeUpdate {
}
export declare const BeforeUpdateMetadataKey = "BeforeUpdateMetadataKey";
export declare const BeforeUpdate: () => any;
export declare class BeforeUpdatePropertyAst extends PropertyContext<BeforeUpdate> {
}
export declare function isBeforeUpdatePropertyAst(val: PropertyAst): val is PropertyAst<BeforeUpdate>;
