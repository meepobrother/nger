"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const root = process.cwd();
const lodash_1 = require("lodash");
function creatServer(name) {
    const code = `import { NgModule } from 'nger-core';
import pcPages, { ${lodash_1.upperFirst(lodash_1.camelCase(name))}PcWelcomePage } from './template/pc';
import adminPages from './template/admin';
import appPages from './template/app';

import incs from './inc';
import { ${lodash_1.upperFirst(lodash_1.camelCase(name))}Typeorm } from './typeorm';
@NgModule({
    declarations: [
        ...pcPages,
        ...adminPages,
        ...appPages,
        ...incs
    ],
    providers: [],
    bootstrap: [
        ${lodash_1.upperFirst(lodash_1.camelCase(name))}PcWelcomePage
    ],
    imports: [
        ${lodash_1.upperFirst(lodash_1.camelCase(name))}Typeorm
    ]
})
export default class ${lodash_1.upperFirst(lodash_1.camelCase(name))}ServerModule { }
`;
    const path = path_1.join(root, 'addon', name, 'server.ts');
    fs_extra_1.default.ensureDirSync(path_1.dirname(path));
    fs_extra_1.default.writeFileSync(path, code);
}
exports.creatServer = creatServer;
