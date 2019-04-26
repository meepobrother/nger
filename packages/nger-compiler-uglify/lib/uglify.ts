import { Injectable } from 'nger-core'
import { minify, MinifyOptions } from 'uglify-js'
@Injectable()
export class NgerCompilerUglify {
    compile(content: string, config: MinifyOptions): Promise<Buffer> {
        const output = minify(content, config)
        return Promise.resolve(Buffer.from(output.code))
    }
}