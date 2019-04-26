import { Injectable } from 'nger-core'
import less from 'less';
import fs from 'fs-extra'
@Injectable()
export class NgerCompilerLess {
    compile(content: string, config: Less.Options): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            less.render(content, config, async (error: Less.RenderError, output: Less.RenderOutput) => {
                const promises: any[] = [];
                const res = Buffer.caller(0);
                output.imports.map(imp => {
                    const code = fs.readFileSync(imp).toString('utf8');
                    promises.push(this.compile(code, config).then(buf => res.concat(buf)));
                });
                await Promise.all(promises);
                if (error) {
                    reject(error);
                } else {
                    resolve(res.concat(Buffer.from(output.css)));
                }
            });
        });
    }
}