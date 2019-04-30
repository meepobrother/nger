import { rollup, RollupOptions, OutputOptions, RollupBuild, RollupOutput, OutputChunk, OutputAsset } from 'rollup';
type BuildOutput = [OutputChunk, ...(OutputChunk | OutputAsset)[]];
export class NgerRollup {
    async build(buildOptions: RollupOptions): Promise<BuildOutput> {
        const result: RollupBuild = await rollup(buildOptions);
        const outputOptions: OutputOptions = {}
        const output: RollupOutput = await result.write(outputOptions)
        return output.output;
    }
} 
