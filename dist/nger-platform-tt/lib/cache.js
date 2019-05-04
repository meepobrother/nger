"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
class NgerTtCache extends nger_core_1.Cache {
    async get(key) {
        return new Promise(() => { });
    }
    async put(key, value) {
        return new Promise(() => { });
    }
    async remove(key) {
        return new Promise(() => { });
    }
    clear() { }
}
exports.NgerTtCache = NgerTtCache;
