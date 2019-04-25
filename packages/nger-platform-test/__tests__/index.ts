import mocha, { MochaOptions } from 'mocha';
const options: MochaOptions = {};
const _mocha = new mocha(options);
import { join } from 'path'
_mocha.addFile(join(__dirname, '.test.ts'))
_mocha.run();
