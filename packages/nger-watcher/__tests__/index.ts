import { watcher } from '../lib'
import { join } from 'path'
watcher(join(__dirname, 'test.ts'))