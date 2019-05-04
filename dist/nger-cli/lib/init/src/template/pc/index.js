"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const root = process.cwd();
const lodash_1 = require("lodash");
function createTemplatePc(name) {
    const code = `import { ${lodash_1.upperFirst(lodash_1.camelCase(name))}PcWelcomePage } from './welcome';
export default [${lodash_1.upperFirst(lodash_1.camelCase(name))}PcWelcomePage ];
export * from './welcome';
`;
    const path = path_1.join(root, 'addon', name, 'template', 'pc', 'index.ts');
    fs_extra_1.default.ensureDirSync(path_1.dirname(path));
    fs_extra_1.default.writeFileSync(path, code);
}
exports.createTemplatePc = createTemplatePc;
tslib_1.__exportStar(require("./welcome/index"), exports);
tslib_1.__exportStar(require("./welcome/index.scss"), exports);
