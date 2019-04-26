import { Injectable } from 'nger-core'
import ts from 'typescript'
@Injectable()
export class NgerCompilerTypescript {
    compile(content: string, config: ts.TranspileOptions): Promise<Buffer> {
        const output = ts.transpileModule(content, config)
        return Promise.resolve(Buffer.from(output.outputText))
    }
}