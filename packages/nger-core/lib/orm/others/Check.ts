import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface CheckOptions {
    expression: string
};
export const CheckMetadataKey = 'CheckMetadataKey'
export const Check = (expression: string) => makeDecorator<CheckOptions>(CheckMetadataKey)({
    expression
});
export class CheckAst extends PropertyContext<CheckOptions>{ }
export function isCheckPropertyAst(val: PropertyAst): val is PropertyAst<CheckOptions> {
    return val.metadataKey === CheckMetadataKey;
}
