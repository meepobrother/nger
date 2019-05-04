import { TypeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export declare const HostMetadataKey = "HostMetadataKey";
export interface HostOptions {
}
export interface HostDecorator {
    (): TypeDecorator;
    new (): HostOptions;
}
export declare const Host: HostDecorator;
export declare class HostConstructorAst extends ConstructorContext<HostOptions> {
}
export declare function isHostConstructorAst(ast: ConstructorAst): ast is ConstructorAst<HostOptions>;
