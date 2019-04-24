import { TypeContext } from 'ims-decorator';
import { HostConstructorAst, SelfConstructorAst, InjectConstructorAst, OptionalConstructorAst, SkipSelfConstructorAst } from 'nger-core';
import { Record, DependencyRecord, OptionFlags } from './injector'
import { resolveForwardRef } from './util'
// Host/Self/Inject/Optional/SkipSelf
export function createTypeRecord(context: TypeContext): { token: any, record: Record } {
    // 没有Attribute
    if (context.parent) {
        context.injector = context.parent.injector.create([])
    }
    // 构建deps
    const deps = new Array<DependencyRecord>(context.target.length);
    context.paramsTypes.map((type, index) => {
        deps[index] = {
            token: type,
            options: OptionFlags.Default
        }
    })
    context.getConstructor().map(ast => {
        if (ast instanceof HostConstructorAst) {
            // host 一直往上找 忽略默认
        }
        if (ast instanceof SelfConstructorAst) {
            // Self只在自己找
            let options = deps[ast.ast.parameterIndex].options;
            deps[ast.ast.parameterIndex].options = options & ~OptionFlags.CheckParent;
        }
        if (ast instanceof InjectConstructorAst) {
            // 依赖注入
            const def = ast.ast.metadataDef
            deps[ast.ast.parameterIndex].token = resolveForwardRef(def.token || ast.ast.parameterType)
        }
        if (ast instanceof OptionalConstructorAst) {
            let options = deps[ast.ast.parameterIndex].options;
            // Optional没找到忽略
            deps[ast.ast.parameterIndex].options = options | OptionFlags.Optional;
        }
        if (ast instanceof SkipSelfConstructorAst) {
            // SkipSelf忽略自己
            let options = deps[ast.ast.parameterIndex].options;
            deps[ast.ast.parameterIndex].options = options & ~OptionFlags.CheckSelf;
        }
    });
    return {
        token: context.target,
        record: new Record(
            (...params: any[]) => new context.target(...params),
            deps,
            undefined
        )
    }
}
