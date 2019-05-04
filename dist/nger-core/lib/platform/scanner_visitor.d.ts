import { NullAstVisitor, Visitors } from 'ims-decorator';
/** 扫描生成ast */
export declare class Scanner extends NullAstVisitor {
}
/** 外观模式 提供统一的接口 用于负责多个scanner统一调用 */
export declare class ScannerVisitor extends Visitors {
    constructor(visitors: Scanner[]);
}
