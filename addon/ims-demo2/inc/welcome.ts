import { Controller, Get } from 'nger-core'
import { UserEntity } from '../typeorm/entities/user.entry'
@Controller({
    path: '/'
})
export class ImsDemo2Controller {
    @Get()
    userInfo(user: UserEntity) { }
}
