import { TypeContext } from 'ims-decorator'
import { Inject } from '../decorators/inject'
import { createTypeProvider } from './createStaticProvider'
/** 解析器 */
export abstract class Parser {
    abstract parse<T>(context: TypeContext): T | undefined;
}
export class DefaultParser extends Parser {
    parse<T>(context: TypeContext): T {
        const provider = createTypeProvider(context.target, context)
        return context.injector.create([provider]).get(context.target)
    }
}
/** 外观模式 提供统一接口 */
export class ParserVisitor extends Parser {
    constructor(@Inject(Parser) public allParser: Parser[]) {
        super()
    }
    parse<T>(context: TypeContext): T | undefined {
        for (let item of this.allParser) {
            let res = item.parse<T>(context);
            if (res) return res;
        }
    }
}
