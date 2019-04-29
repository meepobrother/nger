import NgerPlatformTest from "nger-platform-test";
import { getTypeContext } from './util'
const app = getTypeContext('src/app');
NgerPlatformTest().bootstrapModule(app)