import { createPlatformFactory, platformCore, Http } from 'nger-core';
import axios from 'axios'
export default createPlatformFactory(platformCore, 'axios', [{
    provide: Http,
    useValue: axios
}]);
