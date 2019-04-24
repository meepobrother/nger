import {
    NullAstVisitor, AstVisitor,
    ClassAst, ParserAstContext,
    ConstructorAst, ParameterAst,
    MethodAst, PropertyAst, Ast,
    getContext, ClassContext, PropertyContext,
    MethodContext, ConstructorContext
} from 'ims-decorator';
import { Injector } from '@angular/core';
export class TypeContext {
    // 上级
    parent: TypeContext;
    children: TypeContext[] = [];
    classes: ClassContext<any>[] = [];
    propertys: PropertyContext<any>[] = [];
    methods: MethodContext<any>[] = [];
    constructors: ConstructorContext<any>[] = [];
    /** 目标 */
    target: any;
    /** 实例 */
    instance: any;
    global: Map<string, any> = new Map();

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

    constructor(public type: any, public visitor: AstVisitor) {
        const context = getContext(type);
        if (context) {
            this.target = type;
            context.typeContext = this;
            context.visitor = visitor;
            this.classes = context.visitClass();
            this.propertys = context.visitProperty();
            this.methods = context.visitMethod();
            this.constructors = context.visitController();
            // injector get
            this.instance = new type();
        } else {
            throw new Error(`${type.name} get context error`)
        }
    }

    inject(type: any) {
        return this.get(type)
    }

    getClass<T extends ClassContext<any> = ClassContext<any>>(metadataKey: string): T | undefined {
        try {
            const item = this.classes.find(cls => cls.ast.metadataKey === metadataKey) as T;
            if (item) return item;
            return this.parent && this.parent.getClass<T>(metadataKey)
        } catch (e) {
            // console.log(`pless ims-common to handler :${metadataKey}`);
        }
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

    getController(metadataKey?: string): ConstructorContext<any>[] {
        if (metadataKey) {
            return this.constructors.filter(cls => cls.ast.metadataKey === metadataKey)
        }
        return this.constructors;
    }
}

export class Visitors extends NullAstVisitor {
    constructor(public visitors: AstVisitor[]) {
        super();
    }
    visitType(type: any) {
        const context = getContext(type);
        if (context) {
            return new TypeContext(type, this);
        } else {
            // throw new Error(`visitType:${type.name} get context error`)
        }
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