import { TypeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export declare const SkipSelfMetadataKey = "SkipSelfMetadataKey";
export interface SkipSelfOptions {
}
export interface SkipSelfDecorator {
    (): TypeDecorator;
    new (): SkipSelfOptions;
}
export declare const SkipSelf: SkipSelfDecorator;
export declare class SkipSelfConstructorAst extends ConstructorContext<SkipSelfOptions> {
}
export declare function isSkipSelfConstructorAst(ast: ConstructorAst): ast is ConstructorAst<SkipSelfOptions>;
