import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface AfterRemove {
}
export declare const AfterRemoveMetadataKey = "AfterRemoveMetadataKey";
export declare const AfterRemove: () => any;
export declare class AfterRemovePropertyAst extends PropertyContext<AfterRemove> {
}
export declare function isAfterRemovePropertyAst(val: PropertyAst): val is PropertyAst<AfterRemove>;
