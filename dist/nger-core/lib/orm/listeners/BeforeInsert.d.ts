import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface BeforeInsert {
}
export declare const BeforeInsertMetadataKey = "BeforeInsertMetadataKey";
export declare const BeforeInsert: () => any;
export declare class BeforeInsertPropertyAst extends PropertyContext<BeforeInsert> {
}
export declare function isBeforeInsertPropertyAst(val: PropertyAst): val is PropertyAst<BeforeInsert>;
