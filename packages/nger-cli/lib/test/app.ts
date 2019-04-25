import { NgerPlatformTest } from "nger-platform-test";
import { ConsoleLogger, LogLevel } from 'nger-logger';
import { getTypeContext } from './util'
const test = new NgerPlatformTest();
const app = getTypeContext('src/app');
test.bootstrap(app)