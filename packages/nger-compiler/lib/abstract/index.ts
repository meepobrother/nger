import { Type } from 'nger-di'
export interface StyleRef {
    /** 源码 */
    sourceCode: string;
    /** 目标代码 */
    destCode: string;
    /** 错误 */
    errors: Error[];
}
/** 页面编译结果 */
export interface PageRef {
    // 页面路径
    path: string;
    // 文件源码
    sourceCode: string;
    // 源码路径
    sourceFile: string;
    // 输出路径
    outputPath: string;
    // 编译后代码
    code: string;
    // json
    json: string;
    // 样式
    style: string;
    html: string;
}
/** 组件编译结果 */
export interface ComponentRef {
    // 文件源码
    sourceCode: string;
    // 源码路径
    sourceFile: string;
    // 编译后代码
    code: string;
    // 输出路径
    outputPath: string;
}
/** 编译器编译结果 */
export interface NgModuleRef {
    pages: PageRef[];
    components: ComponentRef[];
}

/** 创建编译器配置项目 */
export interface CompilerOptions { }
export abstract class Compiler {
    /**
     * 编译NgModule文件
     * @param path 文件路径
     * @param type ngModule类
     */
    abstract compileNgModule(path: string, type: Type<any>): NgModuleRef;
}

export abstract class CompilerFactory {
    /**
     * 创建编译器
     */
    abstract create(options: CompilerOptions): Compiler;
}
