import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface AfterUpdate {
}
export declare const AfterUpdateMetadataKey = "AfterUpdateMetadataKey";
export declare const AfterUpdate: () => any;
export declare class AfterUpdatePropertyAst extends PropertyContext<AfterUpdate> {
}
export declare function isAfterUpdatePropertyAst(val: PropertyAst): val is PropertyAst<AfterUpdate>;
