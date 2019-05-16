import "reflect-metadata";
import { Injector } from '@nger/di';
export interface Type<T> extends Function {
    new (...args: any[]): T;
}
export declare function isType<T>(val: any): val is Type<T>;
export declare const getDesignType: (target: any, propertyKey: string | number | symbol) => any;
export declare const getDesignParamTypes: (target: any, propertyKey?: string | number | symbol) => any;
export declare const getDesignTargetParams: (target: any) => any;
export declare const getDesignReturnType: (target: any, propertyKey: string | number | symbol) => any;
export declare enum AstTypes {
    class = 0,
    constructor = 1,
    property = 2,
    parameter = 3,
    method = 4
}
export declare abstract class Ast<T = any> {
    type: AstTypes;
    target: any;
    metadataKey: string;
    metadataDef: T;
    constructor(type: AstTypes, target: any, metadataKey: string, metadataDef: T);
    abstract visit(visitor: AstVisitor, context?: any): any;
}
export declare class ClassAst<T = any> extends Ast<T> {
    params: any[];
    paramsLength: number;
    constructor(target: Type<any>, metadataKey: string, metadataDef: T, params: any[], paramsLength: number);
    visit(visitor: AstVisitor, context?: any): any;
}
export declare class ClassContext<T> {
    context: ParserAstContext;
    ast: ClassAst<T>;
    readonly parent: TypeContext;
    readonly target: any;
    getParent(metadataKey: string): ClassContext<any> | undefined;
    constructor(ast: ClassAst, context: ParserAstContext);
    forEachObjectToTypeContent<T extends TypeContext = TypeContext>(obj: any[] | object, defs?: any[]): T[];
}
export declare function isClassAst<T>(val: Ast): val is ClassAst<T>;
export declare class PropertyAst<T = any> extends Ast<T> {
    propertyKey: PropertyKey;
    propertyType: any;
    constructor(target: any, metadataKey: string, metadataDef: T, propertyKey: PropertyKey, propertyType: any);
    visit(visitor: AstVisitor, context?: any): any;
}
export declare class PropertyContext<T> {
    ast: PropertyAst<T>;
    context: ParserAstContext;
    constructor(ast: PropertyAst<T>, context: ParserAstContext);
}
export declare function isPropertyAst<T>(val: Ast): val is PropertyAst<T>;
export declare class MethodAst<T = any> extends Ast<T> {
    propertyKey: PropertyKey;
    returnType: any;
    parameterTypes: any[];
    parameterLength: number;
    descriptor: any;
    parameters: ParameterAst[];
    constructor(target: any, metadataKey: string, metadataDef: T, propertyKey: PropertyKey, returnType: any, parameterTypes: any[], parameterLength: number, descriptor: any);
    visit(visitor: AstVisitor, context?: any): any;
}
export declare class MethodContext<T> {
    ast: MethodAst<T>;
    context: ParserAstContext;
    parameters: ParameterContext<any>[];
    constructor(ast: MethodAst<T>, context: ParserAstContext);
}
export declare function isMethodAst<T>(val: Ast): val is MethodAst<T>;
export declare class ParameterAst<T = any> extends Ast<T> {
    propertyKey: PropertyKey;
    parameterType: any;
    parameterIndex: number;
    constructor(target: any, metadataKey: string, metadataDef: T, propertyKey: PropertyKey, parameterType: any, parameterIndex: number);
    visit(visitor: AstVisitor, context?: any): any;
}
export declare class ParameterContext<T> {
    ast: ParameterAst<T>;
    context: ParserAstContext;
    constructor(ast: ParameterAst<T>, context: ParserAstContext);
}
export declare function isParameterAst<T>(val: Ast): val is ParameterAst<T>;
export declare class ConstructorAst<T = any> extends Ast<T> {
    parameterType: any;
    parameterIndex: number;
    parameterLength: number;
    constructor(target: any, metadataKey: string, metadataDef: T, parameterType: any, parameterIndex: number, parameterLength: number);
    visit(visitor: AstVisitor, context?: any): any;
}
export declare class ConstructorContext<T> {
    ast: ConstructorAst<T>;
    context: ParserAstContext;
    constructor(ast: ConstructorAst<T>, context: ParserAstContext);
}
export declare function isConstructorAst<T>(val: Ast): val is ConstructorAst<T>;
export interface AstVisitor {
    visit(ast: Ast, context: ParserAstContext): any;
    visitType(type: any): TypeContext | undefined;
    visitClass(ast: ClassAst, context: ParserAstContext): any;
    visitMethod(ast: MethodAst, context: ParserAstContext): any;
    visitProperty(ast: PropertyAst, context: ParserAstContext): any;
    visitParameter(ast: ParameterAst, context: ParserAstContext): any;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): any;
}
export declare class TypeContext {
    type: any;
    visitor: AstVisitor;
    parent: TypeContext;
    children: TypeContext[];
    classes: ClassContext<any>[];
    propertys: PropertyContext<any>[];
    methods: MethodContext<any>[];
    constructors: ConstructorContext<any>[];
    global: Map<string, any>;
    /** 目标 */
    target: any;
    /** 实例 */
    instance: any;
    injector: Injector;
    setParent(parent: TypeContext): void;
    get<T = any>(key: any): T | undefined;
    set(key: any, val: any): void;
    paramsLength: number;
    paramsTypes: any[];
    context: ParserAstContext | undefined;
    constructor(type: any, visitor: AstVisitor);
    visitType<T extends TypeContext = TypeContext>(type: any): T;
    inject(type: any): {};
    getClass<T extends ClassContext<any> = ClassContext<any>>(metadataKey: string): T | undefined;
    getProperty(metadataKey?: string): PropertyContext<any>[];
    getMethod(metadataKey?: string): MethodContext<any>[];
    getConstructor(metadataKey?: string): ConstructorContext<any>[];
}
export declare class NullAstVisitor implements AstVisitor {
    visit(ast: Ast, context?: ParserAstContext): any;
    visitType(type: any): TypeContext;
    visitClass(ast: ClassAst, context?: ParserAstContext): any;
    visitMethod(ast: MethodAst, context: ParserAstContext): any;
    visitProperty(ast: PropertyAst, context: ParserAstContext): any;
    visitParameter(ast: ParameterAst, context: ParserAstContext): any;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): any;
}
export declare class Visitors extends NullAstVisitor {
    visitors: AstVisitor[];
    constructor(visitors: AstVisitor[]);
    visitClass(ast: ClassAst, context: ParserAstContext): any;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): any;
    visitParameter(ast: ParameterAst, context: ParserAstContext): any;
    visitMethod(ast: MethodAst, context: ParserAstContext): any;
    visitProperty(ast: PropertyAst, context: ParserAstContext): any;
    visitMap(ast: Ast, context: ParserAstContext): any;
}
/** 获取ParserAstContext */
export declare const imsContext: unique symbol;
export declare function getContext(target: any): ParserAstContext | undefined;
export declare class ParserAstContext {
    private _stats;
    prevAst: Ast;
    constructors: ConstructorAst[];
    classes: ClassAst[];
    propertys: PropertyAst[];
    methods: MethodAst[];
    parameters: ParameterAst[];
    parametersMap: Map<PropertyKey, ParameterAst[]>;
    readonly instance: any;
    visitor: AstVisitor;
    typeContext: TypeContext;
    global: any;
    visit(ast: Ast): any;
    visitType<T extends TypeContext = TypeContext>(type: any): T | undefined;
    inject(type: any): any;
    visitClass(metadataKey?: string): ClassContext<any>[];
    visitProperty(metadataKey?: string): PropertyContext<any>[];
    visitMethod(metadataKey?: string): MethodContext<any>[];
    visitController(metadataKey?: string): ConstructorContext<any>[];
    getClassAst(metadataKey?: string): ClassAst[];
    getProperty(metadataKey?: string): PropertyAst[];
    getMethod(metadataKey?: string): MethodAst[];
    getConstructor(metadataKey?: string): ConstructorAst[];
    stats: AstTypes;
}
export declare class ParserVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): void;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): void;
    visitProperty(ast: PropertyAst, context: ParserAstContext): void;
    visitMethod(ast: MethodAst, context: ParserAstContext): void;
    visitParameter(ast: ParameterAst, context: ParserAstContext): void;
}
export declare class ParserManager {
    visitor: AstVisitor;
    _map: Map<any, ParserAstContext>;
    getContext(target: any): any;
}
export interface DefaultOptions<T, O = any> {
    type: 'parameter' | 'property' | 'method' | 'constructor' | 'class';
    metadataDef: T;
    metadataKey: string;
    target: Type<O>;
    propertyKey?: PropertyKey;
    propertyType?: any;
    descriptor?: TypedPropertyDescriptor<any>;
    parameterIndex?: number;
    parameterType?: any;
    paramTypes?: any[];
    returnType?: any;
}
export declare function makeDecorator2<T>(metadataKey: string, props: (...args: any) => T): {
    new (...args: any[]): any;
    (...args: any[]): any;
    (...args: any[]): (target: any, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<any> | number) => any;
};
export interface TypeDecorator {
    <T extends Type<any>>(type: T): T;
    (target: any, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<any> | number): void;
}
export declare function makeDecorator<T>(metadataKey: string, getDefault?: (opt: DefaultOptions<T>) => T, parentClass?: any): {
    new (opt?: T): any;
    (opt?: T): any;
    (opt?: T): (target: any, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<any> | number) => any;
};
export interface Abstract<T> extends Function {
    prototype: T;
}
