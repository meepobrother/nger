"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_factory_1 = require("./component_factory");
const component_factory_2 = require("./component_factory");
class ComponentFactoryResolver {
    constructor(contexts, injector) {
        this.injector = injector;
        this.map = new Map();
        contexts.map(ctx => {
            // 这个时候需要注册
            const creators = injector.get(component_factory_2.ComponentCreator);
            // 处理Component
            creators.map(creat => {
                creat(ctx);
            });
            this.map.set(ctx.target, ctx);
        });
    }
    resolveComponentFactory(component) {
        const context = this.map.get(component);
        if (context) {
            const factory = new component_factory_1.ComponentFactory(context);
            return factory;
        }
        throw new Error(`ComponentFactoryResolver: resolve component error`);
    }
    // 获取所有的组件
    getComponents() {
        let arr = [];
        this.map.forEach((item, key) => arr.push(item));
        return arr;
    }
}
exports.ComponentFactoryResolver = ComponentFactoryResolver;
