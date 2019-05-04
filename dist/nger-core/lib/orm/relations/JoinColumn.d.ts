import { PropertyAst, PropertyContext } from 'ims-decorator';
import { JoinColumnOptions } from 'typeorm';
export interface JoinColumn {
    options?: JoinColumnOptions | JoinColumnOptions[];
}
export declare const JoinColumnMetadataKey = "JoinColumnMetadataKey";
export declare function JoinColumn(): Function;
export declare function JoinColumn(options: JoinColumnOptions): Function;
export declare function JoinColumn(options: JoinColumnOptions[]): Function;
export declare function isJoinColumnPropertyAst(val: PropertyAst): val is PropertyAst<JoinColumn>;
export declare class JoinColumnPropertyAst extends PropertyContext<JoinColumn> {
}
