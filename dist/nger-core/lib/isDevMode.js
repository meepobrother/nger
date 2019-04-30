Object.defineProperty(exports, "__esModule", { value: true });
let _dev = false;
function isDevMode() {
    return _dev;
}
exports.isDevMode = isDevMode;
function setDevMode(d) {
    _dev = d;
}
exports.setDevMode = setDevMode;
let _port = 3000;
function getPort() {
    return _port;
}
exports.getPort = getPort;
function setPort(port) {
    _port = port;
}
exports.setPort = setPort;
