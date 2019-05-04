import { TypeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export declare const OptionalMetadataKey = "OptionalMetadataKey";
export interface OptionalOptions {
}
export interface OptionalDecorator {
    (): TypeDecorator;
    new (): OptionalOptions;
}
export declare const Optional: OptionalDecorator;
export declare class OptionalConstructorAst extends ConstructorContext<OptionalOptions> {
}
export declare function isOptionalConstructorAst(ast: ConstructorAst): ast is ConstructorAst<OptionalOptions>;
