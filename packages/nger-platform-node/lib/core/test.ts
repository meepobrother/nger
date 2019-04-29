import { getNgModuleConfig, getComponentConfig } from './transformNgModule'
import { join } from 'path';
const root = process.cwd();
const ngModulePath = require(join(root, 'attachment/weapp/nger-app.json'))
const ngModule = getNgModuleConfig(ngModulePath);
const componentPath = require(join(root, 'attachment/weapp/template/mobile/home/home/metadata.json'))
const component = getComponentConfig(componentPath);
debugger;