import { NgerPlatformTest } from "nger-platform-test";
import { getTypeContext } from './util'
const test = new NgerPlatformTest();
const app = getTypeContext('src/server');
test.bootstrap(app)