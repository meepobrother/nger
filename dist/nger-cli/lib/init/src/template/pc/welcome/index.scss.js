"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const root = process.cwd();
function createTemplatePcWelcomeScss(name) {
    const code = `.${name}{
    display: block;
}`;
    const path = path_1.join(root, 'addon', name, 'template', 'pc/welcome', 'index.scss');
    fs_extra_1.default.ensureDirSync(path_1.dirname(path));
    fs_extra_1.default.writeFileSync(path, code);
}
exports.createTemplatePcWelcomeScss = createTemplatePcWelcomeScss;
