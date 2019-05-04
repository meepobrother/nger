import { TypeContext } from 'ims-decorator';
import { Injector } from 'nger-di';
/** 解析器 */
export declare abstract class Parser {
    abstract parse<T>(instance: T, context: TypeContext): T;
}
export declare class DefaultParser extends Parser {
    injector: Injector;
    constructor(injector: Injector);
    parse<T>(instance: T, context: TypeContext): T;
}
/** 外观模式 提供统一接口 */
export declare class ParserVisitor extends Parser {
    allParser: Parser[];
    constructor(allParser: Parser[]);
    parse<T>(instance: T, context: TypeContext): T;
}
