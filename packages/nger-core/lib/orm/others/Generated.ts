import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface GeneratedOptions {
    strategy?: "increment" | "uuid" | "rowid"
}
export const GeneratedMetadataKey = 'GeneratedMetadataKey'
export const Generated = (strategy?: "increment" | "uuid" | "rowid") => makeDecorator<GeneratedOptions>(GeneratedMetadataKey)({
    strategy
});
export class GeneratedPropertyAst extends PropertyContext<GeneratedOptions>{ }
export function isGeneratedPropertyAst(val: PropertyAst): val is PropertyAst<GeneratedOptions> {
    return val.metadataKey === GeneratedMetadataKey;
}
