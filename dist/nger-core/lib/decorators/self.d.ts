import { TypeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export declare const SelfMetadataKey = "SelfMetadataKey";
export interface SelfOptions {
}
export interface SelfDecorator {
    (): TypeDecorator;
    new (): SelfOptions;
}
export declare const Self: SelfDecorator;
export declare class SelfConstructorAst extends ConstructorContext<SelfOptions> {
}
export declare function isSelfConstructorAst(ast: ConstructorAst): ast is ConstructorAst<SelfOptions>;
