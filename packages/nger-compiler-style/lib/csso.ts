import { Injectable } from 'nger-core'
import csso from 'csso';

@Injectable()
export class NgerCompilerCsso {
    compile(content: string, options?: csso.MinifyOptions & csso.CompressOptions): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const res = csso.minify(content, options)
            resolve(Buffer.from(res.css));
        });
    }
}
