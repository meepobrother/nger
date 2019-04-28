import { NullAstVisitor, Visitors } from 'ims-decorator'
import { Inject } from '../decorators/inject'
/** 扫描生成ast */
export class Scanner extends NullAstVisitor { }
/** 外观模式 提供统一的接口 用于负责多个scanner统一调用 */
export class ScannerVisitor extends Visitors {
    constructor(@Inject(Scanner) visitors: Scanner[]) {
        super(visitors)
    }
}