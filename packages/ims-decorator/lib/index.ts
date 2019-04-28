import "reflect-metadata";
import { Injector, StaticProvider } from 'nger-di';
export interface Type<T> extends Function {
    new(...args: any[]): T;
}
export function isType<T>(val: any): val is Type<T> {
    return typeof val === 'function'
}
export const getDesignType = (target: any, propertyKey: PropertyKey) => Reflect.getMetadata('design:type', target, propertyKey as any);
export const getDesignParamTypes = (target: any, propertyKey?: PropertyKey) => Reflect.getMetadata('design:paramtypes', target, propertyKey as any);
export const getDesignTargetParams = (target: any) => Reflect.getMetadata('design:paramtypes', target);
export const getDesignReturnType = (target: any, propertyKey: PropertyKey) => Reflect.getMetadata('design:returntype', target, propertyKey as any);
export enum AstTypes {
    class,
    constructor,
    property,
    parameter,
    method
}
export abstract class Ast<T = any> {
    constructor(
        public type: AstTypes,
        public target: any,
        public metadataKey: string,
        public metadataDef: T,
    ) { }
    abstract visit(visitor: AstVisitor, context?: any): any;
}

export class ClassAst<T = any> extends Ast<T> {
    constructor(
        target: Type<any>,
        metadataKey: string,
        metadataDef: T,
        public params: any[],
        public paramsLength: number,
    ) {
        super(AstTypes.class, target, metadataKey, metadataDef);
    }
    visit(visitor: AstVisitor, context?: any): any {
        return visitor.visitClass(this, context);
    }
}
export class ClassContext<T> {
    ast: ClassAst<T>;
    get parent(): TypeContext {
        return this.context.typeContext.parent
    }
    get target() {
        return this.ast.target;
    }
    getParent(metadataKey: string): ClassContext<any> | undefined {
        if (this.parent) {
            return this.parent.getClass(metadataKey)
        }
    }
    constructor(ast: ClassAst, public context: ParserAstContext) {
        this.ast = ast;
    }
    forEachObjectToTypeContent<T extends TypeContext = TypeContext>(obj: any[] | object, defs: any[] = []): T[] {
        if (obj) {
            Object.keys(obj).map(key => {
                const context = this.context.visitType<T>(obj[key]);
                if (context) defs.push(context)
            });
        };
        return defs;
    }
}
export function isClassAst<T>(val: Ast): val is ClassAst<T> {
    return val.type === AstTypes.class;
}
export class PropertyAst<T = any> extends Ast<T> {
    constructor(
        target: any,
        metadataKey: string,
        metadataDef: T,
        public propertyKey: PropertyKey,
        public propertyType: any,
    ) {
        super(AstTypes.property, target, metadataKey, metadataDef);
    }
    visit(visitor: AstVisitor, context?: any): any {
        return visitor.visitProperty(this, context);
    }
}
export class PropertyContext<T>{
    constructor(public ast: PropertyAst<T>, public context: ParserAstContext) { }
}
export function isPropertyAst<T>(val: Ast): val is PropertyAst<T> {
    return val.type === AstTypes.property;
}
export class MethodAst<T = any> extends Ast<T> {
    parameters: ParameterAst[] = [];
    constructor(
        target: any,
        metadataKey: string,
        metadataDef: T,
        public propertyKey: PropertyKey,
        public returnType: any,
        public parameterTypes: any[],
        public parameterLength: number,
        public descriptor: any
    ) {
        super(AstTypes.method, target, metadataKey, metadataDef);
    }
    visit(visitor: AstVisitor, context?: any): any {
        return visitor.visitMethod(this, context);
    }
}
export class MethodContext<T> {
    parameters: ParameterContext<any>[] = [];
    constructor(public ast: MethodAst<T>, public context: ParserAstContext) {
        if (ast.parameters) this.parameters = ast.parameters.map(par => context.visit(par))
    }
}
export function isMethodAst<T>(val: Ast): val is MethodAst<T> {
    return val.type === AstTypes.method;
}
export class ParameterAst<T = any> extends Ast<T> {
    constructor(
        target: any,
        metadataKey: string,
        metadataDef: T,
        public propertyKey: PropertyKey,
        public parameterType: any,
        public parameterIndex: number
    ) {
        super(AstTypes.parameter, target, metadataKey, metadataDef);
    }
    visit(visitor: AstVisitor, context?: any): any {
        return visitor.visitParameter(this, context)
    }
}
export class ParameterContext<T> {
    constructor(public ast: ParameterAst<T>, public context: ParserAstContext) { }
}
export function isParameterAst<T>(val: Ast): val is ParameterAst<T> {
    return val.type === AstTypes.parameter;
}
export class ConstructorAst<T = any> extends Ast<T> {
    constructor(
        target: any,
        metadataKey: string,
        metadataDef: T,
        public parameterType: any,
        public parameterIndex: number,
        public parameterLength: number
    ) {
        super(AstTypes.constructor, target, metadataKey, metadataDef);
    }
    visit(visitor: AstVisitor, context?: any): any {
        return visitor.visitConstructor(this, context);
    }
}
export class ConstructorContext<T> {
    constructor(public ast: ConstructorAst<T>, public context: ParserAstContext) { }
}
export function isConstructorAst<T>(val: Ast): val is ConstructorAst<T> {
    return val.type === AstTypes.constructor;
}
export interface AstVisitor {
    visit(ast: Ast, context: ParserAstContext): any;
    visitType(type: any): TypeContext | undefined;
    visitClass(ast: ClassAst, context: ParserAstContext): any;
    visitMethod(ast: MethodAst, context: ParserAstContext): any;
    visitProperty(ast: PropertyAst, context: ParserAstContext): any;
    visitParameter(ast: ParameterAst, context: ParserAstContext): any;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): any;
}
import { ConsoleLogger, LogLevel } from 'nger-logger'
export class TypeContext {
    parent: TypeContext;
    children: TypeContext[] = [];
    classes: ClassContext<any>[] = [];
    propertys: PropertyContext<any>[] = [];
    methods: MethodContext<any>[] = [];
    constructors: ConstructorContext<any>[] = [];
    // 全局变量
    global: Map<string, any> = new Map();
    /** 目标 */
    target: any;
    /** 实例 */
    instance: any;
    // 依赖注入操作
    injector: Injector;
    setParent(parent: TypeContext) {
        this.parent = parent;
        parent.children.push(this);
    }
    get<T = any>(key: any): T | undefined {
        if (this.global.has(key)) return this.global.get(key);
        if (this.parent) return this.parent.get(key)
    }
    set(key: any, val: any) {
        this.global.set(key, val);
    }
    paramsLength: number = 0;
    paramsTypes: any[] = [];
    context: ParserAstContext | undefined;
    constructor(public type: any, public visitor: AstVisitor) {
        this.target = type;
        this.context = getContext(type);
        if (this.context) {
            this.context.typeContext = this;
            this.context.visitor = visitor;
            this.classes = this.context.visitClass();
            this.propertys = this.context.visitProperty();
            this.methods = this.context.visitMethod();
            this.constructors = this.context.visitController();
        }
        const types = getDesignTargetParams(type) || [];
        this.paramsTypes = types;
        this.paramsLength = types.length;
    }

    visitType<T extends TypeContext = TypeContext>(type: any): T {
        const typeContext = this.visitor.visitType(type);
        if (typeContext) {
            typeContext.setParent(this);
        }
        return typeContext as T;
    }

    inject(type: any) {
        return this.injector.get(type)
    }

    getClass<T extends ClassContext<any> = ClassContext<any>>(metadataKey: string): T | undefined {
        try {
            const item = this.classes.find(cls => cls.ast.metadataKey === metadataKey) as T;
            if (item) return item;
            return this.parent && this.parent.getClass<T>(metadataKey)
        } catch (e) { }
    }

    getProperty(metadataKey?: string): PropertyContext<any>[] {
        if (metadataKey) {
            return this.propertys.filter(cls => cls.ast.metadataKey === metadataKey)
        }
        return this.propertys;
    }

    getMethod(metadataKey?: string): MethodContext<any>[] {
        if (metadataKey) {
            return this.methods.filter(cls => cls.ast.metadataKey === metadataKey)
        }
        return this.methods;
    }

    getConstructor(metadataKey?: string): ConstructorContext<any>[] {
        if (metadataKey) {
            return this.constructors.filter(cls => cls.ast.metadataKey === metadataKey)
        }
        return this.constructors;
    }
}

export class NullAstVisitor implements AstVisitor {
    visit(ast: Ast, context?: ParserAstContext) {
        return ast.visit(this, context);
    }
    visitType(type: any): TypeContext {
        return new TypeContext(type, this)
    }
    visitClass(ast: ClassAst, context?: ParserAstContext): any { }
    visitMethod(ast: MethodAst, context: ParserAstContext): any { }
    visitProperty(ast: PropertyAst, context: ParserAstContext): any { }
    visitParameter(ast: ParameterAst, context: ParserAstContext): any { }
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): any { }
}
export class Visitors extends NullAstVisitor {
    constructor(public visitors: AstVisitor[]) {
        super();
    }
    visitClass(ast: ClassAst, context: ParserAstContext) {
        const res = this.visitMap(ast, context);
        if (res) return res;
    }
    visitConstructor(ast: ConstructorAst, context: ParserAstContext) {
        const res = this.visitMap(ast, context);
        if (res) return res;
    }
    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        const res = this.visitMap(ast, context);
        if (res) return res;
    }
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        const res = this.visitMap(ast, context);
        if (res) return res;
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        const res = this.visitMap(ast, context);
        if (res) return res;
    }
    visitMap(ast: Ast, context: ParserAstContext) {
        context.visitor = this;
        for (let visitor of this.visitors) {
            const res = ast.visit(visitor, context);
            if (res) return res;
        }
    }
}

/** 获取ParserAstContext */
export const imsContext = Symbol.for('imsContext');
export function getContext(target: any): ParserAstContext | undefined {
    if (target) {
        return Reflect.get(target, imsContext);
    }
}

export class ParserAstContext {
    private _stats: AstTypes;
    prevAst: Ast;

    constructors: ConstructorAst[] = [];
    classes: ClassAst[] = [];
    propertys: PropertyAst[] = [];
    methods: MethodAst[] = [];
    parameters: ParameterAst[] = [];
    parametersMap: Map<PropertyKey, ParameterAst[]> = new Map();

    get instance() {
        return this.typeContext.instance;
    }

    visitor: AstVisitor;
    typeContext: TypeContext;
    global: any = {};

    visit(ast: Ast) {
        return ast.visit(this.visitor, this)
    }

    visitType<T extends TypeContext = TypeContext>(type: any): T | undefined {
        const typeContext = this.visitor.visitType(type);
        if (typeContext) {
            typeContext.setParent(this.typeContext);
        }
        return typeContext as T;
    }

    inject(type: any) {
        return this.typeContext.get(type)
    }

    visitClass(metadataKey?: string): ClassContext<any>[] {
        if (metadataKey) return this.getClassAst(metadataKey).map(cls => this.visit(cls));
        return this.classes.map(cls => {
            return this.visit(cls);
        });
    }

    visitProperty(metadataKey?: string): PropertyContext<any>[] {
        if (metadataKey) return this.getProperty(metadataKey).map(cls => this.visit(cls));
        return this.propertys.map(cls => this.visit(cls))
    }

    visitMethod(metadataKey?: string): MethodContext<any>[] {
        if (metadataKey) return this.getMethod(metadataKey).map(cls => this.visit(cls));
        return this.methods.map(cls => this.visit(cls))
    }

    visitController(metadataKey?: string): ConstructorContext<any>[] {
        if (metadataKey) return this.getConstructor(metadataKey).map(cls => this.visit(cls));
        return this.constructors.map(cls => this.visit(cls))
    }

    getClassAst(metadataKey?: string): ClassAst[] {
        if (metadataKey) {
            return this.classes.filter(cls => cls.metadataKey === metadataKey);
        } else {
            return this.classes;
        }
    }

    getProperty(metadataKey?: string): PropertyAst[] {
        if (metadataKey) {
            return this.propertys.filter(pro => pro.metadataKey === metadataKey)
        } else {
            return this.propertys;
        }
    }

    getMethod(metadataKey?: string): MethodAst[] {
        if (metadataKey) {
            return this.methods.filter(pro => pro.metadataKey === metadataKey);
        } else {
            return this.methods;
        }
    }

    getConstructor(metadataKey?: string): ConstructorAst[] {
        if (metadataKey && this.constructors) {
            return this.constructors.filter(pro => pro.metadataKey === metadataKey)
        } else {
            return this.constructors;
        }
    }

    get stats(): AstTypes {
        return this._stats
    }
    set stats(val: AstTypes) {
        if (this.stats === AstTypes.parameter && val !== AstTypes.parameter) {
            // 离开保存数据
            const ast = this.prevAst;
            if (isParameterAst(ast)) {
                this.parametersMap.set(ast.propertyKey, this.parameters)
            }
            this.parameters = [];
        }
        this._stats = val;
    }
}

export class ParserVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        context.stats = AstTypes.class;
        context.prevAst = ast;
        context.classes.push(ast);
        ast.target[imsContext] = context;
    }
    visitConstructor(ast: ConstructorAst, context: ParserAstContext) {
        context.stats = AstTypes.constructor;
        context.prevAst = ast;
        context.constructors.push(ast);
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        context.stats = AstTypes.property;
        context.prevAst = ast;
        context.propertys.push(ast);
    }
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        context.stats = AstTypes.method;
        context.prevAst = ast;
        ast.parameters = context.parametersMap.get(ast.propertyKey) || [];
        context.methods.push(ast);
    }
    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        context.stats = AstTypes.parameter;
        context.prevAst = ast;
        context.parameters.push(ast);
    }
}

export class ParserManager {
    visitor: AstVisitor = new ParserVisitor();
    _map: Map<any, ParserAstContext> = new Map();
    getContext(target: any) {
        if (this._map.has(target)) return this._map.get(target);
        this._map.set(target, new ParserAstContext());
        return this.getContext(target);
    }
}

const parserManager = new ParserManager();

export interface DefaultOptions<T> {
    type: 'parameter' | 'property' | 'method' | 'constructor' | 'class';
    metadataDef: T;
    metadataKey: string;
    target: any;
    propertyKey?: PropertyKey;
    propertyType?: any;
    descriptor?: TypedPropertyDescriptor<any>;
    parameterIndex?: number;
    parameterType?: any;
    paramTypes?: any[];
    returnType?: any;
}
export function makeDecorator2<T extends Array<any>, O>(metadataKey: string, pro: (...args: T) => O) {
    return (...params: T) => {
        const opt = pro(...params);
        return makeDecorator<O>(metadataKey)(opt)
    }
}
export function makeDecorator<T>(metadataKey: string, getDefault: (opt: DefaultOptions<T>) => T = opt => opt.metadataDef || {} as T) {
    const visitor = parserManager.visitor;
    return (metadataDef?: T) => (target: any, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<any> | number) => {
        if (propertyKey) {
            if (typeof descriptor === 'number') {
                const context = parserManager.getContext(target.constructor);
                const types = getDesignParamTypes(target, propertyKey) || []
                metadataDef = getDefault({
                    type: 'parameter',
                    metadataDef: metadataDef as T,
                    metadataKey,
                    target,
                    propertyKey,
                    parameterIndex: descriptor,
                    parameterType: types[descriptor]
                });
                // parameter
                const ast = new ParameterAst(target, metadataKey, metadataDef, propertyKey, types[descriptor], descriptor);
                visitor.visitParameter(ast, context)
            } else if (typeof descriptor === 'undefined') {
                // property
                const context = parserManager.getContext(target.constructor);
                const propertyType = getDesignType(target, propertyKey)
                metadataDef = getDefault({
                    type: 'property',
                    metadataDef: metadataDef as T,
                    metadataKey,
                    target,
                    propertyKey,
                    propertyType
                });
                const ast = new PropertyAst(target, metadataKey, metadataDef, propertyKey, propertyType);
                visitor.visitProperty(ast, context)
            } else {
                // method
                try {
                    const returnType = getDesignReturnType(target, propertyKey)
                    const paramTypes = getDesignParamTypes(target, propertyKey) || [];
                    const context = parserManager.getContext(target.constructor);
                    metadataDef = getDefault({
                        type: 'method',
                        metadataDef: metadataDef as T,
                        metadataKey,
                        target,
                        propertyKey,
                        paramTypes,
                        returnType
                    });
                    const ast = new MethodAst(target, metadataKey, metadataDef, propertyKey, returnType, paramTypes, target[propertyKey].length, descriptor);
                    visitor.visitMethod(ast, context);
                } catch (e) { }
            }
        } else {
            if (typeof descriptor === 'number') {
                // constructor
                const context = parserManager.getContext(target);
                const types = getDesignTargetParams(target) || []
                metadataDef = getDefault({
                    type: 'constructor',
                    metadataDef: metadataDef as T,
                    metadataKey,
                    target,
                    parameterType: types[descriptor],
                    parameterIndex: descriptor,
                });
                const ast = new ConstructorAst(target, metadataKey, metadataDef, types[descriptor], descriptor, types.length);
                visitor.visitConstructor(ast, context)
            } else {
                // class
                const context = parserManager.getContext(target);
                const types = getDesignTargetParams(target) || []
                metadataDef = getDefault({
                    type: 'class',
                    metadataDef: metadataDef as T,
                    metadataKey,
                    target
                });
                const ast = new ClassAst(target, metadataKey, metadataDef, types, types.length);
                visitor.visitClass(ast, context);
                return target;
            }
        }
    }
}

export interface Abstract<T> extends Function {
    prototype: T;
}
