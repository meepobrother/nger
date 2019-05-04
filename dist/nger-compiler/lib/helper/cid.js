"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CID = require('cids');
const multihashing = require('multihashing');
function createCid(code) {
    const buf = Buffer.from(code);
    const hash = multihashing(buf, 'sha2-256');
    const cid = new CID(1, 'dag-pb', hash);
    return cid.toString();
}
class NgerCompilerCid {
    create(code) {
        return createCid(code);
    }
}
exports.NgerCompilerCid = NgerCompilerCid;
