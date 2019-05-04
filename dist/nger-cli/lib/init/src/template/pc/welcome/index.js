"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const lodash_1 = require("lodash");
const root = process.cwd();
function createTemplatePcWelcome(name) {
    const code = `import { Page } from 'nger-core';
@Page({
    path: '/admin/welcome',
    styleUrls: [
        "./index.scss"
    ]
})
export class ${lodash_1.upperFirst(lodash_1.camelCase(name))}PcWelcomePage {
    render() {
        return <div></div>
    }
}
`;
    const path = path_1.join(root, 'addon', name, 'template', 'pc/welcome', 'index.tsx');
    fs_extra_1.default.ensureDirSync(path_1.dirname(path));
    fs_extra_1.default.writeFileSync(path, code);
}
exports.createTemplatePcWelcome = createTemplatePcWelcome;
