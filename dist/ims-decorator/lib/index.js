"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function isType(val) {
    return typeof val === 'function';
}
exports.isType = isType;
exports.getDesignType = (target, propertyKey) => Reflect.getMetadata('design:type', target, propertyKey);
exports.getDesignParamTypes = (target, propertyKey) => Reflect.getMetadata('design:paramtypes', target, propertyKey);
exports.getDesignTargetParams = (target) => Reflect.getMetadata('design:paramtypes', target);
exports.getDesignReturnType = (target, propertyKey) => Reflect.getMetadata('design:returntype', target, propertyKey);
var AstTypes;
(function (AstTypes) {
    AstTypes[AstTypes["class"] = 0] = "class";
    AstTypes[AstTypes["constructor"] = 1] = "constructor";
    AstTypes[AstTypes["property"] = 2] = "property";
    AstTypes[AstTypes["parameter"] = 3] = "parameter";
    AstTypes[AstTypes["method"] = 4] = "method";
})(AstTypes = exports.AstTypes || (exports.AstTypes = {}));
class Ast {
    constructor(type, target, metadataKey, metadataDef) {
        this.type = type;
        this.target = target;
        this.metadataKey = metadataKey;
        this.metadataDef = metadataDef;
    }
}
exports.Ast = Ast;
class ClassAst extends Ast {
    constructor(target, metadataKey, metadataDef, params, paramsLength) {
        super(AstTypes.class, target, metadataKey, metadataDef);
        this.params = params;
        this.paramsLength = paramsLength;
    }
    visit(visitor, context) {
        return visitor.visitClass(this, context);
    }
}
exports.ClassAst = ClassAst;
class ClassContext {
    constructor(ast, context) {
        this.context = context;
        this.ast = ast;
    }
    get parent() {
        return this.context.typeContext.parent;
    }
    get target() {
        return this.ast.target;
    }
    getParent(metadataKey) {
        if (this.parent) {
            return this.parent.getClass(metadataKey);
        }
    }
    forEachObjectToTypeContent(obj, defs = []) {
        if (obj) {
            Object.keys(obj).map(key => {
                const context = this.context.visitType(obj[key]);
                if (context)
                    defs.push(context);
            });
        }
        ;
        return defs;
    }
}
exports.ClassContext = ClassContext;
function isClassAst(val) {
    return val.type === AstTypes.class;
}
exports.isClassAst = isClassAst;
class PropertyAst extends Ast {
    constructor(target, metadataKey, metadataDef, propertyKey, propertyType) {
        super(AstTypes.property, target, metadataKey, metadataDef);
        this.propertyKey = propertyKey;
        this.propertyType = propertyType;
    }
    visit(visitor, context) {
        return visitor.visitProperty(this, context);
    }
}
exports.PropertyAst = PropertyAst;
class PropertyContext {
    constructor(ast, context) {
        this.ast = ast;
        this.context = context;
    }
}
exports.PropertyContext = PropertyContext;
function isPropertyAst(val) {
    return val.type === AstTypes.property;
}
exports.isPropertyAst = isPropertyAst;
class MethodAst extends Ast {
    constructor(target, metadataKey, metadataDef, propertyKey, returnType, parameterTypes, parameterLength, descriptor) {
        super(AstTypes.method, target, metadataKey, metadataDef);
        this.propertyKey = propertyKey;
        this.returnType = returnType;
        this.parameterTypes = parameterTypes;
        this.parameterLength = parameterLength;
        this.descriptor = descriptor;
        this.parameters = [];
    }
    visit(visitor, context) {
        return visitor.visitMethod(this, context);
    }
}
exports.MethodAst = MethodAst;
class MethodContext {
    constructor(ast, context) {
        this.ast = ast;
        this.context = context;
        this.parameters = [];
        if (ast.parameters)
            this.parameters = ast.parameters.map(par => context.visit(par));
    }
}
exports.MethodContext = MethodContext;
function isMethodAst(val) {
    return val.type === AstTypes.method;
}
exports.isMethodAst = isMethodAst;
class ParameterAst extends Ast {
    constructor(target, metadataKey, metadataDef, propertyKey, parameterType, parameterIndex) {
        super(AstTypes.parameter, target, metadataKey, metadataDef);
        this.propertyKey = propertyKey;
        this.parameterType = parameterType;
        this.parameterIndex = parameterIndex;
    }
    visit(visitor, context) {
        return visitor.visitParameter(this, context);
    }
}
exports.ParameterAst = ParameterAst;
class ParameterContext {
    constructor(ast, context) {
        this.ast = ast;
        this.context = context;
    }
}
exports.ParameterContext = ParameterContext;
function isParameterAst(val) {
    return val.type === AstTypes.parameter;
}
exports.isParameterAst = isParameterAst;
class ConstructorAst extends Ast {
    constructor(target, metadataKey, metadataDef, parameterType, parameterIndex, parameterLength) {
        super(AstTypes.constructor, target, metadataKey, metadataDef);
        this.parameterType = parameterType;
        this.parameterIndex = parameterIndex;
        this.parameterLength = parameterLength;
    }
    visit(visitor, context) {
        return visitor.visitConstructor(this, context);
    }
}
exports.ConstructorAst = ConstructorAst;
class ConstructorContext {
    constructor(ast, context) {
        this.ast = ast;
        this.context = context;
    }
}
exports.ConstructorContext = ConstructorContext;
function isConstructorAst(val) {
    return val.type === AstTypes.constructor;
}
exports.isConstructorAst = isConstructorAst;
class TypeContext {
    constructor(type, visitor) {
        this.type = type;
        this.visitor = visitor;
        this.children = [];
        this.classes = [];
        this.propertys = [];
        this.methods = [];
        this.constructors = [];
        // 全局变量
        this.global = new Map();
        this.paramsLength = 0;
        this.paramsTypes = [];
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
        const types = exports.getDesignTargetParams(type) || [];
        this.paramsTypes = types;
        this.paramsLength = types.length;
    }
    setParent(parent) {
        this.parent = parent;
        parent.children.push(this);
    }
    get(key) {
        if (this.global.has(key))
            return this.global.get(key);
        if (this.parent)
            return this.parent.get(key);
    }
    set(key, val) {
        this.global.set(key, val);
    }
    visitType(type) {
        const typeContext = this.visitor.visitType(type);
        if (typeContext) {
            typeContext.setParent(this);
        }
        return typeContext;
    }
    inject(type) {
        return this.injector.get(type);
    }
    getClass(metadataKey) {
        try {
            const item = this.classes.find(cls => cls.ast.metadataKey === metadataKey);
            if (item)
                return item;
            return this.parent && this.parent.getClass(metadataKey);
        }
        catch (e) { }
    }
    getProperty(metadataKey) {
        if (metadataKey) {
            return this.propertys.filter(cls => cls.ast.metadataKey === metadataKey);
        }
        return this.propertys;
    }
    getMethod(metadataKey) {
        if (metadataKey) {
            return this.methods.filter(cls => cls.ast.metadataKey === metadataKey);
        }
        return this.methods;
    }
    getConstructor(metadataKey) {
        if (metadataKey) {
            return this.constructors.filter(cls => cls.ast.metadataKey === metadataKey);
        }
        return this.constructors;
    }
}
exports.TypeContext = TypeContext;
class NullAstVisitor {
    visit(ast, context) {
        return ast.visit(this, context);
    }
    visitType(type) {
        return new TypeContext(type, this);
    }
    visitClass(ast, context) { }
    visitMethod(ast, context) { }
    visitProperty(ast, context) { }
    visitParameter(ast, context) { }
    visitConstructor(ast, context) { }
}
exports.NullAstVisitor = NullAstVisitor;
class Visitors extends NullAstVisitor {
    constructor(visitors) {
        super();
        this.visitors = visitors;
    }
    visitClass(ast, context) {
        const res = this.visitMap(ast, context);
        if (res)
            return res;
    }
    visitConstructor(ast, context) {
        const res = this.visitMap(ast, context);
        if (res)
            return res;
    }
    visitParameter(ast, context) {
        const res = this.visitMap(ast, context);
        if (res)
            return res;
    }
    visitMethod(ast, context) {
        const res = this.visitMap(ast, context);
        if (res)
            return res;
    }
    visitProperty(ast, context) {
        const res = this.visitMap(ast, context);
        if (res)
            return res;
    }
    visitMap(ast, context) {
        context.visitor = this;
        for (let visitor of this.visitors) {
            const res = ast.visit(visitor, context);
            if (res)
                return res;
        }
    }
}
exports.Visitors = Visitors;
/** 获取ParserAstContext */
exports.imsContext = Symbol.for('imsContext');
function getContext(target) {
    if (target) {
        return Reflect.get(target, exports.imsContext);
    }
}
exports.getContext = getContext;
class ParserAstContext {
    constructor() {
        this.constructors = [];
        this.classes = [];
        this.propertys = [];
        this.methods = [];
        this.parameters = [];
        this.parametersMap = new Map();
        this.global = {};
    }
    get instance() {
        return this.typeContext.instance;
    }
    visit(ast) {
        return ast.visit(this.visitor, this);
    }
    visitType(type) {
        const typeContext = this.visitor.visitType(type);
        if (typeContext) {
            typeContext.setParent(this.typeContext);
        }
        return typeContext;
    }
    inject(type) {
        return this.typeContext.get(type);
    }
    visitClass(metadataKey) {
        if (metadataKey)
            return this.getClassAst(metadataKey).map(cls => this.visit(cls));
        return this.classes.map(cls => {
            return this.visit(cls);
        });
    }
    visitProperty(metadataKey) {
        if (metadataKey)
            return this.getProperty(metadataKey).map(cls => this.visit(cls));
        return this.propertys.map(cls => this.visit(cls));
    }
    visitMethod(metadataKey) {
        if (metadataKey)
            return this.getMethod(metadataKey).map(cls => this.visit(cls));
        return this.methods.map(cls => this.visit(cls));
    }
    visitController(metadataKey) {
        if (metadataKey)
            return this.getConstructor(metadataKey).map(cls => this.visit(cls));
        return this.constructors.map(cls => this.visit(cls));
    }
    getClassAst(metadataKey) {
        if (metadataKey) {
            return this.classes.filter(cls => cls.metadataKey === metadataKey);
        }
        else {
            return this.classes;
        }
    }
    getProperty(metadataKey) {
        if (metadataKey) {
            return this.propertys.filter(pro => pro.metadataKey === metadataKey);
        }
        else {
            return this.propertys;
        }
    }
    getMethod(metadataKey) {
        if (metadataKey) {
            return this.methods.filter(pro => pro.metadataKey === metadataKey);
        }
        else {
            return this.methods;
        }
    }
    getConstructor(metadataKey) {
        if (metadataKey && this.constructors) {
            return this.constructors.filter(pro => pro.metadataKey === metadataKey);
        }
        else {
            return this.constructors;
        }
    }
    get stats() {
        return this._stats;
    }
    set stats(val) {
        if (this.stats === AstTypes.parameter && val !== AstTypes.parameter) {
            // 离开保存数据
            const ast = this.prevAst;
            if (isParameterAst(ast)) {
                this.parametersMap.set(ast.propertyKey, this.parameters);
            }
            this.parameters = [];
        }
        this._stats = val;
    }
}
exports.ParserAstContext = ParserAstContext;
class ParserVisitor extends NullAstVisitor {
    visitClass(ast, context) {
        context.stats = AstTypes.class;
        context.prevAst = ast;
        context.classes.push(ast);
        ast.target[exports.imsContext] = context;
    }
    visitConstructor(ast, context) {
        context.stats = AstTypes.constructor;
        context.prevAst = ast;
        context.constructors.push(ast);
    }
    visitProperty(ast, context) {
        context.stats = AstTypes.property;
        context.prevAst = ast;
        context.propertys.push(ast);
    }
    visitMethod(ast, context) {
        context.stats = AstTypes.method;
        context.prevAst = ast;
        ast.parameters = context.parametersMap.get(ast.propertyKey) || [];
        context.methods.push(ast);
    }
    visitParameter(ast, context) {
        context.stats = AstTypes.parameter;
        context.prevAst = ast;
        context.parameters.push(ast);
    }
}
exports.ParserVisitor = ParserVisitor;
class ParserManager {
    constructor() {
        this.visitor = new ParserVisitor();
        this._map = new Map();
    }
    getContext(target) {
        if (this._map.has(target))
            return this._map.get(target);
        this._map.set(target, new ParserAstContext());
        return this.getContext(target);
    }
}
exports.ParserManager = ParserManager;
const parserManager = new ParserManager();
function makeDecorator2(metadataKey, props) {
    function DecoratorFactory(...params) {
        const opt = props(...params);
        return makeDecorator(metadataKey)(opt);
    }
    return DecoratorFactory;
}
exports.makeDecorator2 = makeDecorator2;
function makeDecorator(metadataKey, getDefault = opt => opt.metadataDef || {}, parentClass) {
    const visitor = parserManager.visitor;
    function DecoratorFactory(metadataDef) {
        return function TypeDecorator(target, propertyKey, descriptor) {
            if (propertyKey) {
                if (typeof descriptor === 'number') {
                    const context = parserManager.getContext(target.constructor);
                    const types = exports.getDesignParamTypes(target, propertyKey) || [];
                    metadataDef = getDefault({
                        type: 'parameter',
                        metadataDef: metadataDef,
                        metadataKey,
                        target: target,
                        propertyKey,
                        parameterIndex: descriptor,
                        parameterType: types[descriptor]
                    });
                    // parameter
                    const ast = new ParameterAst(target, metadataKey, metadataDef, propertyKey, types[descriptor], descriptor);
                    visitor.visitParameter(ast, context);
                }
                else if (typeof descriptor === 'undefined') {
                    // property
                    const context = parserManager.getContext(target.constructor);
                    const propertyType = exports.getDesignType(target, propertyKey);
                    metadataDef = getDefault({
                        type: 'property',
                        metadataDef: metadataDef,
                        metadataKey,
                        target: target,
                        propertyKey,
                        propertyType
                    });
                    const ast = new PropertyAst(target, metadataKey, metadataDef, propertyKey, propertyType);
                    visitor.visitProperty(ast, context);
                }
                else {
                    // method
                    try {
                        const returnType = exports.getDesignReturnType(target, propertyKey);
                        const paramTypes = exports.getDesignParamTypes(target, propertyKey) || [];
                        const context = parserManager.getContext(target.constructor);
                        metadataDef = getDefault({
                            type: 'method',
                            metadataDef: metadataDef,
                            metadataKey,
                            target: target,
                            propertyKey,
                            paramTypes,
                            returnType
                        });
                        const ast = new MethodAst(target, metadataKey, metadataDef, propertyKey, returnType, paramTypes, target[propertyKey].length, descriptor);
                        visitor.visitMethod(ast, context);
                    }
                    catch (e) { }
                }
            }
            else {
                if (typeof descriptor === 'number') {
                    // constructor
                    const context = parserManager.getContext(target);
                    const types = exports.getDesignTargetParams(target) || [];
                    metadataDef = getDefault({
                        type: 'constructor',
                        metadataDef: metadataDef,
                        metadataKey,
                        target: target,
                        parameterType: types[descriptor],
                        parameterIndex: descriptor,
                    });
                    const ast = new ConstructorAst(target, metadataKey, metadataDef, types[descriptor], descriptor, types.length);
                    visitor.visitConstructor(ast, context);
                }
                else {
                    // class
                    const context = parserManager.getContext(target);
                    const types = exports.getDesignTargetParams(target) || [];
                    metadataDef = getDefault({
                        type: 'class',
                        metadataDef: metadataDef,
                        metadataKey,
                        target: target
                    });
                    const ast = new ClassAst(target, metadataKey, metadataDef, types, types.length);
                    visitor.visitClass(ast, context);
                    return target;
                }
            }
        };
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.ngMetadataName = metadataKey;
    return DecoratorFactory;
}
exports.makeDecorator = makeDecorator;
