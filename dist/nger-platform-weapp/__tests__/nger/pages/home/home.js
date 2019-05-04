const { Page } = require('../../npm/nger-core')
const { NgerUserInjectable } = require('../../services');

@Page()
export class HomePage {
    constructor(public userService: NgerUserInjectable) { }
}
