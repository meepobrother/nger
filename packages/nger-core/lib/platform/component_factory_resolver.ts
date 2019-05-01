import { Type } from 'nger-di'
import { TypeContext } from 'ims-decorator';
import { ComponentFactory } from './component_factory'
export class ComponentFactoryResolver {
    private map: Map<Type<any>, TypeContext> = new Map();
    constructor(contexts: TypeContext[]) {
        contexts.map(ctx => this.map.set(ctx.target, ctx))
    }
    resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> {
        const context = this.map.get(component);
        if (context) return new ComponentFactory<T>(context)
        throw new Error(`ComponentFactoryResolver: resolve component error`)
    }
    // 获取所有的组件
    getComponents(): TypeContext[] {
        let arr: TypeContext[] = [];
        this.map.forEach((item, key) => arr.push(item))
        return arr;
    }
}