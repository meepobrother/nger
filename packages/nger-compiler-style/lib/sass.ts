import { Injectable } from 'nger-core'
import sass, { Options, SassError, Result } from 'node-sass';
/** 代码合并 */
import { Bundler } from 'scss-bundle';
@Injectable()
export class NgerCompilerSass {
    compile(content: string, config: Options): Promise<Buffer> {
        return new Promise(async (resolve, reject) => {
            let bundledContent = '';
            const { resource, projectDirectory } = config;
            if (resource && projectDirectory) {
                const getBundleContent = async (url: string) => {
                    const bundler = new Bundler(undefined, projectDirectory)
                    const res = await bundler.Bundle(url)
                    bundledContent += res.bundledContent
                }
                try {
                    if (typeof resource === 'string') {
                        await getBundleContent(resource)
                    } else if (Array.isArray(resource)) {
                        for (let url of resource) {
                            await getBundleContent(url)
                        }
                    }
                } catch (e) {
                    reject(e)
                }
            }
            const opts = {
                ...config,
                data: bundledContent ? bundledContent + content : content
            }
            sass.render(opts, (err: SassError, res: Result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.css);
                }
            });
        });
    }
}