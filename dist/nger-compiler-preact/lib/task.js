"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_compiler_1 = require("nger-compiler");
const path_1 = require("path");
const root = process.cwd();
const nger_core_1 = require("nger-core");
const component_1 = require("./transformer_factorys/component");
exports.preactTask = async (file, opt, injector) => {
    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        const metadata = nger_compiler_1.metadataCache.get(file);
        const fs = injector.get(nger_core_1.FILE_SYSTEM);
        const babel = injector.get(nger_compiler_1.NgerCompilerBabel);
        const ngMetadata = injector.get(nger_compiler_1.NgerCompilerNgMetadata);
        const relativePath = path_1.relative(root, file);
        const ext = path_1.extname(relativePath);
        const noExtPath = relativePath.replace(ext, '');
        if (metadata) {
            if (metadata) {
                const component = ngMetadata.getComponentConfig(metadata);
                if (component) {
                    const code = babel.compile(file, {
                        transformers: {
                            before: [
                                await component_1.componentTransformerFactory(file, injector)
                            ]
                        }
                    });
                    const controllerPath = path_1.join(root, '.temp', `${noExtPath}.js`);
                    fs.writeFileSync(controllerPath, code);
                    nger_compiler_1.hasHandlerFileCache.add(file);
                }
            }
        }
        if (nger_compiler_1.hasHandlerFileCache.has(file)) { }
        else {
            const code = babel.compile(file, {});
            const controllerPath = path_1.join(root, '.temp', `${noExtPath}.js`);
            fs.writeFileSync(controllerPath, code);
            nger_compiler_1.hasHandlerFileCache.add(file);
        }
    }
};
