import csso from 'csso';
export declare class NgerCompilerCsso {
    compile(content: string, options?: csso.MinifyOptions & csso.CompressOptions): Promise<string>;
}
