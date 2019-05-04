import { ClassContext, ClassAst } from 'ims-decorator';
export declare const PipeMetadataKey = "PipeMetadataKey";
export interface PipeOptions {
    name: string;
    pure?: boolean;
}
export declare const Pipe: {
    (opt?: PipeOptions): any;
    (opt?: PipeOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: PipeOptions): any;
};
export declare class PipeClassAst extends ClassContext<PipeOptions> {
}
export declare function isPipeClassAst(ast: ClassAst): ast is ClassAst<PipeOptions>;
