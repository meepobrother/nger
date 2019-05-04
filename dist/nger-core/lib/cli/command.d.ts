import { ClassContext, ClassAst } from "ims-decorator";
export declare const CommandMetadataKey = "CommandMetadataKey";
export interface CommandOptions {
    name: string | ReadonlyArray<string>;
    description: string;
    example: {
        command: string;
        description: string;
    };
}
export declare const Command: {
    (opt?: CommandOptions): any;
    (opt?: CommandOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: CommandOptions): any;
};
export interface Command<O, R> {
    action(options: O): R;
}
export declare function isCommandClassAst(val: ClassAst): val is ClassAst<CommandOptions>;
export declare class CommandClassAst extends ClassContext<CommandOptions> {
}
