"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_compiler_1 = require("nger-compiler");
const path_1 = require("path");
const root = process.cwd();
const nger_core_1 = require("nger-core");
exports.clientTask = (file, opt, injector) => {
    if (file.endsWith('.ts')) {
        const fs = injector.get(nger_core_1.FILE_SYSTEM);
        const babel = injector.get(nger_compiler_1.NgerCompilerBabel);
        const ngMetadata = injector.get(nger_compiler_1.NgerCompilerNgMetadata);
        const metadata = ngMetadata.getMetadata(file);
        const relativePath = path_1.relative(root, file);
        const ext = path_1.extname(relativePath);
        const noExtPath = relativePath.replace(ext, '');
        // 解析Controller成浏览器端接口
        if (metadata) {
            const controller = ngMetadata.getControllerConfig(metadata);
            // 服务端
            if (controller) {
                // 是controller
                const code = babel.compile(file, {
                    transformers: {
                        before: [
                            nger_compiler_1.controllerPropertyTransformerFactory
                        ]
                    }
                });
                const controllerPath = path_1.join(root, '.temp', `${noExtPath}.js`);
                fs.writeFileSync(controllerPath, code);
                nger_compiler_1.hasHandlerFileCache.add(file);
            }
        }
    }
};
