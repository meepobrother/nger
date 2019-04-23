import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export interface ExclusionOptions {
    expression: string
};
export const ExclusionMetadataKey = 'ExclusionMetadataKey'
export const Exclusion = (expression: string) => makeDecorator<ExclusionOptions>(ExclusionMetadataKey)({
    expression
});
export class ExclusionAst extends PropertyContext<ExclusionOptions>{ }
export function isExclusionPropertyAst(val: PropertyAst): val is PropertyAst<ExclusionOptions> {
    return val.metadataKey === ExclusionMetadataKey;
}
