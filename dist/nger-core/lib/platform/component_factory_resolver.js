Object.defineProperty(exports, "__esModule", { value: true });
const component_factory_1 = require("./component_factory");
class ComponentFactoryResolver {
    constructor(contexts) {
        this.map = new Map();
        contexts.map(ctx => this.map.set(ctx.target, ctx));
    }
    resolveComponentFactory(component) {
        const context = this.map.get(component);
        if (context)
            return new component_factory_1.ComponentFactory(context);
        throw new Error(`ComponentFactoryResolver: resolve component error`);
    }
    getComponents() {
        let arr = [];
        this.map.forEach((item, key) => arr.push(item));
        return arr;
    }
}
exports.ComponentFactoryResolver = ComponentFactoryResolver;
