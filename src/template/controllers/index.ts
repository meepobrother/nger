import { Get, Post, Controller } from 'nger-core'

@Controller({
    path: '/'
})
export class NgerUserController {
    @Get()
    userInfo: () => Promise<any>;
    @Post()
    setUserInfo: (username: string, age: number) => Promise<any>;
}
