"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ng_module_factory_1 = require("./ng_module_factory");
const error_handler_1 = require("./error_handler");
const lang_1 = require("./lang");
const application_init_status_1 = require("./application_init_status");
class NgModuleBootstrap {
}
exports.NgModuleBootstrap = NgModuleBootstrap;
class PlatformRef {
    constructor(_injector) {
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
    }
    get injector() { return this._injector; }
    get destroyed() { return this._destroyed; }
    async bootstrapModule(moduleType, compilerOptions = {}) {
        const options = lang_1.optionsReducer({}, compilerOptions);
        // 注册injector
        return compileNgModuleFactory(this.injector, options, moduleType)
            .then(moduleFactory => {
            return this.bootstrapModuleFactory(moduleFactory, options);
        });
    }
    async bootstrapModuleFactory(moduleFactory, options) {
        // todo 注入启动参数
        const injector = this.injector.create([], moduleFactory.moduleType.name);
        const moduleRef = moduleFactory.create(injector);
        const exceptionHandler = moduleRef.injector.get(error_handler_1.ErrorHandler, undefined);
        if (!exceptionHandler) {
            throw new Error('No ErrorHandler. Please Regist ErrorHandler');
        }
        moduleRef.onDestroy(() => lang_1.remove(this._modules, moduleRef));
        const initStatus = moduleRef.injector.get(application_init_status_1.ApplicationInitStatus);
        await initStatus.runInitializers();
        await this._moduleDoBootstrap(moduleRef);
        return moduleRef;
    }
    _moduleDoBootstrap(moduleRef) {
        const bootstrap = this.injector.get(NgModuleBootstrap, []);
        console.log(`总共有 ${bootstrap.length} 个启动项目`);
        const tasks = [];
        bootstrap.map((b) => {
            tasks.push(b.run(moduleRef));
        });
        return Promise.all(tasks);
    }
    // 注册销毁钩子
    onDestroy(callback) {
        this._destroyListeners.push(callback);
    }
    // 销毁
    destroy() {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(module => module.destroy());
        this._destroyListeners.forEach(listener => listener());
        this._destroyed = true;
    }
}
exports.PlatformRef = PlatformRef;
function compileNgModuleFactory(injector, options, moduleType) {
    const compilerFactory = injector.get(CompilerFactory);
    const compiler = compilerFactory.createCompiler([options]);
    return compiler.compileModuleAsync(moduleType);
}
class CompilerFactory {
    createCompiler(options) {
        return new Compiler(options);
    }
}
exports.CompilerFactory = CompilerFactory;
// 编译器
class Compiler {
    constructor(options) {
        this.options = options;
    }
    // 编译
    async compileModuleAsync(moduleType) {
        return new ng_module_factory_1.NgModuleFactory(moduleType);
    }
}
exports.Compiler = Compiler;
