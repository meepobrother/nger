import { Injectable } from 'nger-core'
import { HomeController } from '../../inc/home'
@Injectable()
export class NgerUserInjectable {
    constructor(public home: HomeController) { }
    getInfo() {
        return this.home.userInfo();
    }
    setUser(username: string, age: number) {
        return this.home.setUserInfo(username, age)
    }
}
