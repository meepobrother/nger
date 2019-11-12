import { makeDecorator, ClassContext, ClassAst } from "ims-decorator";
export const CommandMetadataKey = 'CommandMetadataKey'
export interface CommandOptions {
    name: string | ReadonlyArray<string>;
    description: string;
    example: {
        command: string;
        description: string
    };
}
export const Command = makeDecorator<CommandOptions>(CommandMetadataKey);
export interface Command<O, R> {
    action(options: O): R;
}
export function isCommandClassAst(val: ClassAst): val is ClassAst<CommandOptions> {
    return val.metadataKey === CommandMetadataKey;
}
export class CommandClassAst extends ClassContext<CommandOptions>{ }
