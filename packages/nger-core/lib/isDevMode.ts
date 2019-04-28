let _dev = false;
export function isDevMode() {
    return _dev;
}

export function setDevMode(d: boolean) {
    _dev = d;
}

let _port: number = 3000;
export function getPort() {
    return _port;
}

export function setPort(port: number) {
    _port = port;
}