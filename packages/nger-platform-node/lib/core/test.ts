import { transformModuleMetadata } from './transformNgModule'
import { join } from 'path';
const root = process.cwd();
const data = require(join(root, 'attachment/weapp/nger-app.json'))

const dest = transformModuleMetadata(data);

debugger;