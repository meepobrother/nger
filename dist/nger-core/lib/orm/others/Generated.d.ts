import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface GeneratedOptions {
    strategy?: "increment" | "uuid" | "rowid";
}
export declare const GeneratedMetadataKey = "GeneratedMetadataKey";
export declare const Generated: (strategy?: "increment" | "uuid" | "rowid") => any;
export declare class GeneratedPropertyAst extends PropertyContext<GeneratedOptions> {
}
export declare function isGeneratedPropertyAst(val: PropertyAst): val is PropertyAst<GeneratedOptions>;
