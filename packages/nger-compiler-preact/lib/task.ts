import {
    Task,
    NgerCompilerBabel,
    NgerCompilerNgMetadata,
    metadataCache,
    hasHandlerFileCache,
    componentRenderTransformerFactory
} from 'nger-compiler'
import { Injector } from 'nger-di'
import { relative, extname, join } from 'path';
const root = process.cwd();
import { FILE_SYSTEM } from 'nger-core'
import { componentTransformerFactory } from './transformer_factorys/component'
export const preactTask: Task = async (file: string, opt: string, injector: Injector) => {
    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        const metadata = metadataCache.get(file);
        const fs = injector.get(FILE_SYSTEM);
        const babel = injector.get(NgerCompilerBabel)
        const ngMetadata = injector.get(NgerCompilerNgMetadata)
        const relativePath = relative(root, file)
        const ext = extname(relativePath);
        const noExtPath = relativePath.replace(ext, '')
        if (metadata) {
            if (metadata) {
                const component = ngMetadata.getComponentConfig(metadata);
                if (component) {
                    const code = babel.compile(file, {
                        transformers: {
                            before: [
                                await componentTransformerFactory(file, injector),
                                componentRenderTransformerFactory
                            ]
                        }
                    });
                    const controllerPath = join(root, '.temp', `${noExtPath}.js`);
                    fs.writeFileSync(controllerPath, code)
                    hasHandlerFileCache.add(file)
                }
            }
        }
        if (hasHandlerFileCache.has(file)) { } else {
            const code = babel.compile(file, {});
            const controllerPath = join(root, '.temp', `${noExtPath}.js`);
            fs.writeFileSync(controllerPath, code)
            hasHandlerFileCache.add(file)
        }
    }
}
