import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface AfterLoad {
}
export declare const AfterLoadMetadataKey = "AfterLoadMetadataKey";
export declare const AfterLoad: () => any;
export declare class AfterLoadPropertyAst extends PropertyContext<AfterLoad> {
}
export declare function isAfterLoadPropertyAst(val: PropertyAst): val is PropertyAst<AfterLoad>;
