import { makeDecorator, ClassContext, ClassAst } from "ims-decorator";
export const CliMetadataKey = 'CliMetadataKey'
export interface CliOptions {
    name?: string,
    version?: string;
    commands?: any[];
}
export const Cli = makeDecorator<CliOptions>(CliMetadataKey);
export interface Cli<O, R> {
    action(options: O): R;
}
export function isCliClassAst(val: ClassAst): val is ClassAst<CliOptions> {
    return val.metadataKey === CliMetadataKey;
}
export class CliClassAst extends ClassContext<CliOptions>{ }
