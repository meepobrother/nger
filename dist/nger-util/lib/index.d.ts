import { Logger, NgerConfig } from 'nger-core';
import { CompilerOptions } from 'typescript';
export declare class NgerUtil {
    logger: Logger;
    config: NgerConfig;
    root: string;
    constructor(logger: Logger, config: NgerConfig);
    rimraf(dir: string): Promise<{}>;
    getCompilerOptions(): CompilerOptions;
    /** 加载包 */
    loadPkg<T = any>(name: string, attr?: string): Promise<T>;
    /** 安装包 */
    addPkg(name: string): Promise<{}>;
    /** 执行命令 */
    execAsync(command: string): Promise<{}>;
    /** 应该用cnpm */
    shouldUseCnpm(): boolean;
    /** 应该用yarn */
    shouldUseYarn(): boolean;
}
