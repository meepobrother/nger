import { compiler } from 'nger-compiler'
import { App } from './app'
import { join } from 'path';
compiler(App, join(__dirname, 'weapp'))
debugger;