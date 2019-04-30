Object.defineProperty(exports, "__esModule", { value: true });
const transformNgModule_1 = require("./transformNgModule");
const path_1 = require("path");
const root = process.cwd();
const ngModulePath = require(path_1.join(root, 'attachment/weapp/nger-app.json'));
const ngModule = transformNgModule_1.getNgModuleConfig(ngModulePath);
const componentPath = require(path_1.join(root, 'attachment/weapp/template/mobile/home/home/metadata.json'));
const component = transformNgModule_1.getComponentConfig(componentPath);
debugger;
