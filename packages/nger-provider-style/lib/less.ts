import { Injectable } from 'nger-core'
import less from 'less';
import fs from 'fs-extra'
@Injectable()
export class NgerCompilerLess {
    compile(content: string, config: Less.Options): Promise<string> {
        return new Promise((resolve, reject) => {
            less.render(content || '', config, async (error: Less.RenderError, output: Less.RenderOutput) => {
                const promises: any[] = [];
                let result = ``
                output.imports.map(imp => {
                    const code = fs.readFileSync(imp).toString('utf8');
                    promises.push(this.compile(code, config).then(buf => result += buf));
                });
                await Promise.all(promises);
                result += output.css;
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}