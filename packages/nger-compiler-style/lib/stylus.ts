import { Injectable } from 'nger-core'
import stylus from 'stylus';

@Injectable()
export class NgerCompilerStylus {
    compile(content: string, config: Stylus.RenderOptions): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            stylus.render(content || '', config, (err: Error, css: string, js: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(Buffer.from(css));
                }
            });
        });
    }
}