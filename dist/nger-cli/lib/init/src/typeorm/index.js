"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const root = process.cwd();
const lodash_1 = require("lodash");
function createTypeorm(name) {
    const code = `import { Typeorm } from 'nger-core'
    import entities from './entities'
    @Typeorm({
        entities: [
            ...entities
        ],
        migrations: [],
        subscribers: []
    })
    export class ${lodash_1.upperFirst(lodash_1.camelCase(name))}Typeorm { }
    `;
    const path = path_1.join(root, 'addon', name, 'typeorm', 'index.ts');
    fs_extra_1.default.ensureDirSync(path_1.dirname(path));
    fs_extra_1.default.writeFileSync(path, code);
}
exports.createTypeorm = createTypeorm;
tslib_1.__exportStar(require("./entities"), exports);
