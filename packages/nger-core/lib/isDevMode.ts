let _dev = false;
export function isDevMode() {
    return _dev;
}

export function setDevMode(d: boolean) {
    _dev = d;
}


let currentDev: string;
export function setCurrentDev(name: string) {
    currentDev = name;
}
export function getCurrentDev() {
    return currentDev;
}


let _port: number = 3000;
export function getPort() {
    return _port;
}

export function setPort(port: number) {
    _port = port;
}