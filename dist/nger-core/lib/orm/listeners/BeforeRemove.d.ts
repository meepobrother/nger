import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface BeforeRemove {
}
export declare const BeforeRemoveMetadataKey = "BeforeRemoveMetadataKey";
export declare const BeforeRemove: () => any;
export declare class BeforeRemovePropertyAst extends PropertyContext<BeforeRemove> {
}
export declare function isBeforeRemovePropertyAst(val: PropertyAst): val is PropertyAst<BeforeRemove>;
