import { Injectable } from 'nger-core'
import less from 'less';

@Injectable()
export class NgerCompilerLess {
    compile(content: string, config: Less.Options): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            less.render(content, config, (error: Less.RenderError, output: Less.RenderOutput) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(Buffer.from(output.css));
                }
            });
        });
    }
}