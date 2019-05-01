import { rollup, RollupOptions, OutputOptions, RollupBuild, RollupOutput, OutputChunk, OutputAsset } from 'rollup';
type BuildOutput = [OutputChunk, ...(OutputChunk | OutputAsset)[]];
import {Injectable} from 'nger-core'
@Injectable()
export class NgerCompilerRollup {
    async build(buildOptions: RollupOptions): Promise<BuildOutput> {
        const result: RollupBuild = await rollup(buildOptions);
        const outputOptions: OutputOptions = {}
        const output: RollupOutput = await result.write(outputOptions)
        return output.output;
    }
} 
