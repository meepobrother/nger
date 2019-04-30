import { NgerBabel} from '../lib/babel'
const babel = new NgerBabel();

const output = babel.compile(`
const tslib_1 = require("tslib");
`)

debugger;