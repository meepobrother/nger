import { RollupOptions, OutputChunk, OutputAsset } from 'rollup';
declare type BuildOutput = [OutputChunk, ...(OutputChunk | OutputAsset)[]];
export declare class NgerCompilerRollup {
    build(buildOptions: RollupOptions): Promise<BuildOutput>;
}
export {};
