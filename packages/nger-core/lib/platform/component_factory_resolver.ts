import { Type, Injector } from 'nger-di'
import { TypeContext } from 'ims-decorator';
import { ComponentFactory } from './component_factory'
import { ComponentCreator } from './component_factory'
export class ComponentFactoryResolver {
    private map: Map<Type<any>, TypeContext> = new Map();
    constructor(contexts: TypeContext[], public injector: Injector) {
        contexts.map(ctx => {
            // 这个时候需要注册
            const creators = injector.get(ComponentCreator);
            // 处理Component
            creators.map(creat => {
                creat(ctx)
            });
            this.map.set(ctx.target, ctx)
        })
    }
    resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> {
        const context = this.map.get(component);
        if (context) {
            const factory = new ComponentFactory<T>(context)
            return factory;
        }
        throw new Error(`ComponentFactoryResolver: resolve component error`)
    }
    // 获取所有的组件
    getComponents(): TypeContext[] {
        let arr: TypeContext[] = [];
        this.map.forEach((item, key) => arr.push(item))
        return arr;
    }
}