import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface AfterInsert {
}
export declare const AfterInsertMetadataKey = "AfterInsertMetadataKey";
export declare const AfterInsert: () => any;
export declare class AfterInsertPropertyAst extends PropertyContext<AfterInsert> {
}
export declare function isAfterInsertPropertyAst(val: PropertyAst): val is PropertyAst<AfterInsert>;
