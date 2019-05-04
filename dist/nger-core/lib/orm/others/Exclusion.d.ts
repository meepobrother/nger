import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface ExclusionOptions {
    expression: string;
}
export declare const ExclusionMetadataKey = "ExclusionMetadataKey";
export declare const Exclusion: (expression: string) => any;
export declare class ExclusionPropertyAst extends PropertyContext<ExclusionOptions> {
}
export declare function isExclusionPropertyAst(val: PropertyAst): val is PropertyAst<ExclusionOptions>;
