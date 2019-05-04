import {
    Task,
    controllerPropertyTransformerFactory,
    NgerCompilerBabel,
    NgerCompilerNgMetadata,
    hasHandlerFileCache
} from 'nger-compiler'
import { Injector } from 'nger-di'
import { relative, extname, join } from 'path';
const root = process.cwd();
import { FileSystem } from 'nger-core'
export const clientTask: Task = (file: string, opt: string, injector: Injector) => {
    if (file.endsWith('.ts')) {
        const fs = injector.get(FileSystem)
        const babel = injector.get(NgerCompilerBabel)
        const ngMetadata = injector.get(NgerCompilerNgMetadata)
        const metadata = ngMetadata.getMetadata(file);
        const relativePath = relative(root, file)
        const ext = extname(relativePath);
        const noExtPath = relativePath.replace(ext, '')
        // 解析Controller成浏览器端接口
        if (metadata) {
            const controller = ngMetadata.getControllerConfig(metadata);
            // 服务端
            if (controller) {
                // 是controller
                const code = babel.compile(file, {
                    transformers: {
                        before: [
                            controllerPropertyTransformerFactory
                        ]
                    }
                });
                const controllerPath = join(root, '.temp', `${noExtPath}.js`);
                fs.writeFileSync(controllerPath, code)
                hasHandlerFileCache.add(file)
            }
        }
    }
}
