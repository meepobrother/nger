let _dev = false;
export function isDevMode() {
    return _dev;
}

export function setDevMode(d: boolean) {
    _dev = d;
}