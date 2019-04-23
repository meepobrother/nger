import { Injectable } from 'nger-core'
import { IndexController } from '../../inc/index'
@Injectable()
export class NgerUserInjectable {
    constructor(public userCtrol: IndexController) { }
    getInfo() {
        return this.userCtrol.userInfo();
    }
    setUser(username: string, age: number) {
        return this.userCtrol.setUserInfo(username, age)
    }
}
