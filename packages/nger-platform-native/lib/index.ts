import {platformCore,createPlatformFactory} from 'nger-core'
import platformProviders from './platform-providers'
export default createPlatformFactory(platformCore,'native',[
    ...platformProviders
])