import { makeDecorator, PropertyContext, PropertyAst } from "ims-decorator";
export const OptionMetadataKey = 'OptionMetadataKey'
import { Options } from 'yargs';
export interface OptionOptions extends Options { }
export const Option = makeDecorator<OptionOptions>(OptionMetadataKey);
export interface Option<O, R> { }
export function isOptionPropertyAst(ast: PropertyAst): ast is PropertyAst<OptionOptions> {
    return ast.metadataKey === OptionMetadataKey;
}
export class OptionPropertyAst extends PropertyContext<OptionOptions>{ }