import { NullAstVisitor, Visitors, TypeContext } from 'ims-decorator'
import { Inject } from '../decorators/inject';
/** 扫描生成ast */
export class Scanner extends NullAstVisitor { }
/** 外观模式 提供统一的接口 用于负责多个scanner统一调用 */
export class ScannerVisitor extends Visitors {
    constructor(@Inject(Scanner) visitors: Scanner[]) {
        super(visitors)
    }
}
/** 解析器 */
export abstract class Parser {
    abstract parse<T>(context: TypeContext): T | undefined;
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
