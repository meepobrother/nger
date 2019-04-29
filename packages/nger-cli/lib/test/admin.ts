import NgerPlatformTest from "nger-platform-test";
import { getTypeContext } from './util'
const app = getTypeContext('src/admin');
NgerPlatformTest().bootstrapModule(app)