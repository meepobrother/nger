import { Controller, Get, Post } from 'nger-core'

@Controller({
    path: '/'
})
export class IndexController {

    info: any = {
        username: 'nger',
        age: 28
    }

    @Get()
    userInfo() {
        return this.info;
    }

    @Post()
    setUserInfo(username: string, age: number) {
        this.info = {
            username,
            age
        }
    }
}