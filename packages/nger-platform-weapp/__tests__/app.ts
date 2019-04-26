import { NgerPlatformWeapp } from 'nger-platform-weapp';
import { ImsTestWeapp } from './nger/app'
import { visitor } from 'nger-core'
new NgerPlatformWeapp().bootstrap(visitor.visitType(ImsTestWeapp))