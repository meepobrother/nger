"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

exports.__esModule = true;

require("zdj7WWhMJ1hUP6oAznapr5qcZDgLMm4jTmjvH6bD4fsJeDCfH.js");

function isType(val) {
  return typeof val === 'function';
}

exports.isType = isType;

exports.getDesignType = function (target, propertyKey) {
  return Reflect.getMetadata('design:type', target, propertyKey);
};

exports.getDesignParamTypes = function (target, propertyKey) {
  return Reflect.getMetadata('design:paramtypes', target, propertyKey);
};

exports.getDesignTargetParams = function (target) {
  return Reflect.getMetadata('design:paramtypes', target);
};

exports.getDesignReturnType = function (target, propertyKey) {
  return Reflect.getMetadata('design:returntype', target, propertyKey);
};

var AstTypes;

(function (AstTypes) {
  AstTypes[AstTypes["class"] = 0] = "class";
  AstTypes[AstTypes["constructor"] = 1] = "constructor";
  AstTypes[AstTypes["property"] = 2] = "property";
  AstTypes[AstTypes["parameter"] = 3] = "parameter";
  AstTypes[AstTypes["method"] = 4] = "method";
})(AstTypes = exports.AstTypes || (exports.AstTypes = {}));

var Ast =
/** @class */
function () {
  function Ast(type, target, metadataKey, metadataDef) {
    this.type = type;
    this.target = target;
    this.metadataKey = metadataKey;
    this.metadataDef = metadataDef;
  }

  return Ast;
}();

exports.Ast = Ast;

var ClassAst =
/** @class */
function (_super) {
  __extends(ClassAst, _super);

  function ClassAst(target, metadataKey, metadataDef, params, paramsLength) {
    var _this = _super.call(this, AstTypes["class"], target, metadataKey, metadataDef) || this;

    _this.params = params;
    _this.paramsLength = paramsLength;
    return _this;
  }

  ClassAst.prototype.visit = function (visitor, context) {
    return visitor.visitClass(this, context);
  };

  return ClassAst;
}(Ast);

exports.ClassAst = ClassAst;

var ClassContext =
/** @class */
function () {
  function ClassContext(ast, context) {
    this.context = context;
    this.ast = ast;
  }

  Object.defineProperty(ClassContext.prototype, "parent", {
    get: function () {
      return this.context.typeContext.parent;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ClassContext.prototype, "target", {
    get: function () {
      return this.ast.target;
    },
    enumerable: true,
    configurable: true
  });

  ClassContext.prototype.getParent = function (metadataKey) {
    if (this.parent) {
      return this.parent.getClass(metadataKey);
    }
  };

  ClassContext.prototype.forEachObjectToTypeContent = function (obj, defs) {
    var _this = this;

    if (defs === void 0) {
      defs = [];
    }

    if (obj) {
      Object.keys(obj).map(function (key) {
        var context = _this.context.visitType(obj[key]);

        if (context) defs.push(context);
      });
    }

    ;
    return defs;
  };

  return ClassContext;
}();

exports.ClassContext = ClassContext;

function isClassAst(val) {
  return val.type === AstTypes["class"];
}

exports.isClassAst = isClassAst;

var PropertyAst =
/** @class */
function (_super) {
  __extends(PropertyAst, _super);

  function PropertyAst(target, metadataKey, metadataDef, propertyKey, propertyType) {
    var _this = _super.call(this, AstTypes.property, target, metadataKey, metadataDef) || this;

    _this.propertyKey = propertyKey;
    _this.propertyType = propertyType;
    return _this;
  }

  PropertyAst.prototype.visit = function (visitor, context) {
    return visitor.visitProperty(this, context);
  };

  return PropertyAst;
}(Ast);

exports.PropertyAst = PropertyAst;

var PropertyContext =
/** @class */
function () {
  function PropertyContext(ast, context) {
    this.ast = ast;
    this.context = context;
  }

  return PropertyContext;
}();

exports.PropertyContext = PropertyContext;

function isPropertyAst(val) {
  return val.type === AstTypes.property;
}

exports.isPropertyAst = isPropertyAst;

var MethodAst =
/** @class */
function (_super) {
  __extends(MethodAst, _super);

  function MethodAst(target, metadataKey, metadataDef, propertyKey, returnType, parameterTypes, parameterLength, descriptor) {
    var _this = _super.call(this, AstTypes.method, target, metadataKey, metadataDef) || this;

    _this.propertyKey = propertyKey;
    _this.returnType = returnType;
    _this.parameterTypes = parameterTypes;
    _this.parameterLength = parameterLength;
    _this.descriptor = descriptor;
    _this.parameters = [];
    return _this;
  }

  MethodAst.prototype.visit = function (visitor, context) {
    return visitor.visitMethod(this, context);
  };

  return MethodAst;
}(Ast);

exports.MethodAst = MethodAst;

var MethodContext =
/** @class */
function () {
  function MethodContext(ast, context) {
    this.ast = ast;
    this.context = context;
    this.parameters = [];
    if (ast.parameters) this.parameters = ast.parameters.map(function (par) {
      return context.visit(par);
    });
  }

  return MethodContext;
}();

exports.MethodContext = MethodContext;

function isMethodAst(val) {
  return val.type === AstTypes.method;
}

exports.isMethodAst = isMethodAst;

var ParameterAst =
/** @class */
function (_super) {
  __extends(ParameterAst, _super);

  function ParameterAst(target, metadataKey, metadataDef, propertyKey, parameterType, parameterIndex) {
    var _this = _super.call(this, AstTypes.parameter, target, metadataKey, metadataDef) || this;

    _this.propertyKey = propertyKey;
    _this.parameterType = parameterType;
    _this.parameterIndex = parameterIndex;
    return _this;
  }

  ParameterAst.prototype.visit = function (visitor, context) {
    return visitor.visitParameter(this, context);
  };

  return ParameterAst;
}(Ast);

exports.ParameterAst = ParameterAst;

var ParameterContext =
/** @class */
function () {
  function ParameterContext(ast, context) {
    this.ast = ast;
    this.context = context;
  }

  return ParameterContext;
}();

exports.ParameterContext = ParameterContext;

function isParameterAst(val) {
  return val.type === AstTypes.parameter;
}

exports.isParameterAst = isParameterAst;

var ConstructorAst =
/** @class */
function (_super) {
  __extends(ConstructorAst, _super);

  function ConstructorAst(target, metadataKey, metadataDef, parameterType, parameterIndex, parameterLength) {
    var _this = _super.call(this, AstTypes.constructor, target, metadataKey, metadataDef) || this;

    _this.parameterType = parameterType;
    _this.parameterIndex = parameterIndex;
    _this.parameterLength = parameterLength;
    return _this;
  }

  ConstructorAst.prototype.visit = function (visitor, context) {
    return visitor.visitConstructor(this, context);
  };

  return ConstructorAst;
}(Ast);

exports.ConstructorAst = ConstructorAst;

var ConstructorContext =
/** @class */
function () {
  function ConstructorContext(ast, context) {
    this.ast = ast;
    this.context = context;
  }

  return ConstructorContext;
}();

exports.ConstructorContext = ConstructorContext;

function isConstructorAst(val) {
  return val.type === AstTypes.constructor;
}

exports.isConstructorAst = isConstructorAst;

var TypeContext =
/** @class */
function () {
  function TypeContext(type, visitor) {
    this.type = type;
    this.visitor = visitor;
    this.children = [];
    this.classes = [];
    this.propertys = [];
    this.methods = [];
    this.constructors = []; // 全局变量

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

    var types = exports.getDesignTargetParams(type) || [];
    this.paramsTypes = types;
    this.paramsLength = types.length;
  }

  TypeContext.prototype.setParent = function (parent) {
    this.parent = parent;
    parent.children.push(this);
  };

  TypeContext.prototype.get = function (key) {
    if (this.global.has(key)) return this.global.get(key);
    if (this.parent) return this.parent.get(key);
  };

  TypeContext.prototype.set = function (key, val) {
    this.global.set(key, val);
  };

  TypeContext.prototype.visitType = function (type) {
    var typeContext = this.visitor.visitType(type);

    if (typeContext) {
      typeContext.setParent(this);
    }

    return typeContext;
  };

  TypeContext.prototype.inject = function (type) {
    return this.injector.get(type);
  };

  TypeContext.prototype.getClass = function (metadataKey) {
    try {
      var item = this.classes.find(function (cls) {
        return cls.ast.metadataKey === metadataKey;
      });
      if (item) return item;
      return this.parent && this.parent.getClass(metadataKey);
    } catch (e) {}
  };

  TypeContext.prototype.getProperty = function (metadataKey) {
    if (metadataKey) {
      return this.propertys.filter(function (cls) {
        return cls.ast.metadataKey === metadataKey;
      });
    }

    return this.propertys;
  };

  TypeContext.prototype.getMethod = function (metadataKey) {
    if (metadataKey) {
      return this.methods.filter(function (cls) {
        return cls.ast.metadataKey === metadataKey;
      });
    }

    return this.methods;
  };

  TypeContext.prototype.getConstructor = function (metadataKey) {
    if (metadataKey) {
      return this.constructors.filter(function (cls) {
        return cls.ast.metadataKey === metadataKey;
      });
    }

    return this.constructors;
  };

  return TypeContext;
}();

exports.TypeContext = TypeContext;

var NullAstVisitor =
/** @class */
function () {
  function NullAstVisitor() {}

  NullAstVisitor.prototype.visit = function (ast, context) {
    return ast.visit(this, context);
  };

  NullAstVisitor.prototype.visitType = function (type) {
    return new TypeContext(type, this);
  };

  NullAstVisitor.prototype.visitClass = function (ast, context) {};

  NullAstVisitor.prototype.visitMethod = function (ast, context) {};

  NullAstVisitor.prototype.visitProperty = function (ast, context) {};

  NullAstVisitor.prototype.visitParameter = function (ast, context) {};

  NullAstVisitor.prototype.visitConstructor = function (ast, context) {};

  return NullAstVisitor;
}();

exports.NullAstVisitor = NullAstVisitor;

var Visitors =
/** @class */
function (_super) {
  __extends(Visitors, _super);

  function Visitors(visitors) {
    var _this = _super.call(this) || this;

    _this.visitors = visitors;
    return _this;
  }

  Visitors.prototype.visitClass = function (ast, context) {
    var res = this.visitMap(ast, context);
    if (res) return res;
  };

  Visitors.prototype.visitConstructor = function (ast, context) {
    var res = this.visitMap(ast, context);
    if (res) return res;
  };

  Visitors.prototype.visitParameter = function (ast, context) {
    var res = this.visitMap(ast, context);
    if (res) return res;
  };

  Visitors.prototype.visitMethod = function (ast, context) {
    var res = this.visitMap(ast, context);
    if (res) return res;
  };

  Visitors.prototype.visitProperty = function (ast, context) {
    var res = this.visitMap(ast, context);
    if (res) return res;
  };

  Visitors.prototype.visitMap = function (ast, context) {
    context.visitor = this;

    for (var _i = 0, _a = this.visitors; _i < _a.length; _i++) {
      var visitor = _a[_i];
      var res = ast.visit(visitor, context);
      if (res) return res;
    }
  };

  return Visitors;
}(NullAstVisitor);

exports.Visitors = Visitors;
/** 获取ParserAstContext */

exports.imsContext = Symbol["for"]('imsContext');

function getContext(target) {
  if (target) {
    return Reflect.get(target, exports.imsContext);
  }
}

exports.getContext = getContext;

var ParserAstContext =
/** @class */
function () {
  function ParserAstContext() {
    this.constructors = [];
    this.classes = [];
    this.propertys = [];
    this.methods = [];
    this.parameters = [];
    this.parametersMap = new Map();
    this.global = {};
  }

  Object.defineProperty(ParserAstContext.prototype, "instance", {
    get: function () {
      return this.typeContext.instance;
    },
    enumerable: true,
    configurable: true
  });

  ParserAstContext.prototype.visit = function (ast) {
    return ast.visit(this.visitor, this);
  };

  ParserAstContext.prototype.visitType = function (type) {
    var typeContext = this.visitor.visitType(type);

    if (typeContext) {
      typeContext.setParent(this.typeContext);
    }

    return typeContext;
  };

  ParserAstContext.prototype.inject = function (type) {
    return this.typeContext.get(type);
  };

  ParserAstContext.prototype.visitClass = function (metadataKey) {
    var _this = this;

    if (metadataKey) return this.getClassAst(metadataKey).map(function (cls) {
      return _this.visit(cls);
    });
    return this.classes.map(function (cls) {
      return _this.visit(cls);
    });
  };

  ParserAstContext.prototype.visitProperty = function (metadataKey) {
    var _this = this;

    if (metadataKey) return this.getProperty(metadataKey).map(function (cls) {
      return _this.visit(cls);
    });
    return this.propertys.map(function (cls) {
      return _this.visit(cls);
    });
  };

  ParserAstContext.prototype.visitMethod = function (metadataKey) {
    var _this = this;

    if (metadataKey) return this.getMethod(metadataKey).map(function (cls) {
      return _this.visit(cls);
    });
    return this.methods.map(function (cls) {
      return _this.visit(cls);
    });
  };

  ParserAstContext.prototype.visitController = function (metadataKey) {
    var _this = this;

    if (metadataKey) return this.getConstructor(metadataKey).map(function (cls) {
      return _this.visit(cls);
    });
    return this.constructors.map(function (cls) {
      return _this.visit(cls);
    });
  };

  ParserAstContext.prototype.getClassAst = function (metadataKey) {
    if (metadataKey) {
      return this.classes.filter(function (cls) {
        return cls.metadataKey === metadataKey;
      });
    } else {
      return this.classes;
    }
  };

  ParserAstContext.prototype.getProperty = function (metadataKey) {
    if (metadataKey) {
      return this.propertys.filter(function (pro) {
        return pro.metadataKey === metadataKey;
      });
    } else {
      return this.propertys;
    }
  };

  ParserAstContext.prototype.getMethod = function (metadataKey) {
    if (metadataKey) {
      return this.methods.filter(function (pro) {
        return pro.metadataKey === metadataKey;
      });
    } else {
      return this.methods;
    }
  };

  ParserAstContext.prototype.getConstructor = function (metadataKey) {
    if (metadataKey && this.constructors) {
      return this.constructors.filter(function (pro) {
        return pro.metadataKey === metadataKey;
      });
    } else {
      return this.constructors;
    }
  };

  Object.defineProperty(ParserAstContext.prototype, "stats", {
    get: function () {
      return this._stats;
    },
    set: function (val) {
      if (this.stats === AstTypes.parameter && val !== AstTypes.parameter) {
        // 离开保存数据
        var ast = this.prevAst;

        if (isParameterAst(ast)) {
          this.parametersMap.set(ast.propertyKey, this.parameters);
        }

        this.parameters = [];
      }

      this._stats = val;
    },
    enumerable: true,
    configurable: true
  });
  return ParserAstContext;
}();

exports.ParserAstContext = ParserAstContext;

var ParserVisitor =
/** @class */
function (_super) {
  __extends(ParserVisitor, _super);

  function ParserVisitor() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ParserVisitor.prototype.visitClass = function (ast, context) {
    context.stats = AstTypes["class"];
    context.prevAst = ast;
    context.classes.push(ast);
    ast.target[exports.imsContext] = context;
  };

  ParserVisitor.prototype.visitConstructor = function (ast, context) {
    context.stats = AstTypes.constructor;
    context.prevAst = ast;
    context.constructors.push(ast);
  };

  ParserVisitor.prototype.visitProperty = function (ast, context) {
    context.stats = AstTypes.property;
    context.prevAst = ast;
    context.propertys.push(ast);
  };

  ParserVisitor.prototype.visitMethod = function (ast, context) {
    context.stats = AstTypes.method;
    context.prevAst = ast;
    ast.parameters = context.parametersMap.get(ast.propertyKey) || [];
    context.methods.push(ast);
  };

  ParserVisitor.prototype.visitParameter = function (ast, context) {
    context.stats = AstTypes.parameter;
    context.prevAst = ast;
    context.parameters.push(ast);
  };

  return ParserVisitor;
}(NullAstVisitor);

exports.ParserVisitor = ParserVisitor;

var ParserManager =
/** @class */
function () {
  function ParserManager() {
    this.visitor = new ParserVisitor();
    this._map = new Map();
  }

  ParserManager.prototype.getContext = function (target) {
    if (this._map.has(target)) return this._map.get(target);

    this._map.set(target, new ParserAstContext());

    return this.getContext(target);
  };

  return ParserManager;
}();

exports.ParserManager = ParserManager;
var parserManager = new ParserManager();

function makeDecorator2(metadataKey, pro) {
  return function () {
    var params = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      params[_i] = arguments[_i];
    }

    var opt = pro.apply(void 0, params);
    return makeDecorator(metadataKey)(opt);
  };
}

exports.makeDecorator2 = makeDecorator2;

function makeDecorator(metadataKey, getDefault) {
  if (getDefault === void 0) {
    getDefault = function (opt) {
      return opt.metadataDef || {};
    };
  }

  var visitor = parserManager.visitor;
  return function (metadataDef) {
    return function (target, propertyKey, descriptor) {
      if (propertyKey) {
        if (typeof descriptor === 'number') {
          var context = parserManager.getContext(target.constructor);
          var types = exports.getDesignParamTypes(target, propertyKey) || [];
          metadataDef = getDefault({
            type: 'parameter',
            metadataDef: metadataDef,
            metadataKey: metadataKey,
            target: target,
            propertyKey: propertyKey,
            parameterIndex: descriptor,
            parameterType: types[descriptor]
          }); // parameter

          var ast = new ParameterAst(target, metadataKey, metadataDef, propertyKey, types[descriptor], descriptor);
          visitor.visitParameter(ast, context);
        } else if (typeof descriptor === 'undefined') {
          // property
          var context = parserManager.getContext(target.constructor);
          var propertyType = exports.getDesignType(target, propertyKey);
          metadataDef = getDefault({
            type: 'property',
            metadataDef: metadataDef,
            metadataKey: metadataKey,
            target: target,
            propertyKey: propertyKey,
            propertyType: propertyType
          });
          var ast = new PropertyAst(target, metadataKey, metadataDef, propertyKey, propertyType);
          visitor.visitProperty(ast, context);
        } else {
          // method
          try {
            var returnType = exports.getDesignReturnType(target, propertyKey);
            var paramTypes = exports.getDesignParamTypes(target, propertyKey) || [];
            var context = parserManager.getContext(target.constructor);
            metadataDef = getDefault({
              type: 'method',
              metadataDef: metadataDef,
              metadataKey: metadataKey,
              target: target,
              propertyKey: propertyKey,
              paramTypes: paramTypes,
              returnType: returnType
            });
            var ast = new MethodAst(target, metadataKey, metadataDef, propertyKey, returnType, paramTypes, target[propertyKey].length, descriptor);
            visitor.visitMethod(ast, context);
          } catch (e) {}
        }
      } else {
        if (typeof descriptor === 'number') {
          // constructor
          var context = parserManager.getContext(target);
          var types = exports.getDesignTargetParams(target) || [];
          metadataDef = getDefault({
            type: 'constructor',
            metadataDef: metadataDef,
            metadataKey: metadataKey,
            target: target,
            parameterType: types[descriptor],
            parameterIndex: descriptor
          });
          var ast = new ConstructorAst(target, metadataKey, metadataDef, types[descriptor], descriptor, types.length);
          visitor.visitConstructor(ast, context);
        } else {
          // class
          var context = parserManager.getContext(target);
          var types = exports.getDesignTargetParams(target) || [];
          metadataDef = getDefault({
            type: 'class',
            metadataDef: metadataDef,
            metadataKey: metadataKey,
            target: target
          });
          var ast = new ClassAst(target, metadataKey, metadataDef, types, types.length);
          visitor.visitClass(ast, context);
          return target;
        }
      }
    };
  };
}

exports.makeDecorator = makeDecorator;