import { TypeDecorator, ConstructorContext, ConstructorAst, PropertyContext, PropertyAst } from 'ims-decorator';
export declare const InjectMetadataKey = "InjectMetadataKey";
export interface InjectOptions {
    token: any;
}
export interface InjectDecorator {
    (token?: any): TypeDecorator;
    new (token?: any): InjectOptions;
}
export declare const Inject: InjectDecorator;
export declare class InjectConstructorAst extends ConstructorContext<InjectOptions> {
}
export declare class InjectPropertyAst extends PropertyContext<InjectOptions> {
}
export declare function isInjectPropertyAst(ast: PropertyAst): ast is PropertyAst<InjectOptions>;
export declare function isInjectConstructorAst(ast: ConstructorAst): ast is ConstructorAst<InjectOptions>;
