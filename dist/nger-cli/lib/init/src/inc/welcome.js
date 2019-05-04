"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const root = process.cwd();
const lodash_1 = require("lodash");
function _createIncWelcome(name) {
    const code = `import { Controller } from 'nger-core'
@Controller({
    path: '/'
})
export class ${lodash_1.upperFirst(lodash_1.camelCase(name))}Controller { }
`;
    const path = path_1.join(root, 'addon', name, 'inc', 'welcome.ts');
    fs_extra_1.default.ensureDirSync(path_1.dirname(path));
    fs_extra_1.default.writeFileSync(path, code);
}
exports._createIncWelcome = _createIncWelcome;
