const CID = require('cids');
const multihashing = require('multihashing')
function createCid(code: string) {
    const buf = Buffer.from(code)
    const hash = multihashing(buf, 'sha2-256')
    const cid = new CID(1, 'dag-pb', hash)
    return cid.toString()
}
export class NgerCompilerCid {
    create(code: string) {
        return createCid(code)
    }
}