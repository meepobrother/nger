import { Injectable } from 'nger-core'
import { NgerUserController } from '../controllers'
@Injectable()
export class NgerInjectable {
    constructor(public userCtrol: NgerUserController) { }

    getInfo() {
        return this.userCtrol.userInfo();
    }

    setUser(username: string, age: number) {
        return this.userCtrol.setUserInfo(username, age)
    }
}