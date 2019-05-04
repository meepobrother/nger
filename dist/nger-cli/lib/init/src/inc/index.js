"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const root = process.cwd();
const lodash_1 = require("lodash");
function createIncWelcome(name) {
    const code = `export * from './welcome';
import { ${lodash_1.upperFirst(lodash_1.camelCase(name))}Controller } from './welcome';
export default [${lodash_1.upperFirst(lodash_1.camelCase(name))}Controller];
`;
    const path = path_1.join(root, 'addon', name, 'inc', 'index.ts');
    fs_extra_1.default.ensureDirSync(path_1.dirname(path));
    fs_extra_1.default.writeFileSync(path, code);
}
exports.createIncWelcome = createIncWelcome;
tslib_1.__exportStar(require("./welcome"), exports);
