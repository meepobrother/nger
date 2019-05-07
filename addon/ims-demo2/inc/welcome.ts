import { Controller, Get, EntityRepository } from 'nger-core'
import { UserEntity } from '../typeorm/entities/user.entry'
@Controller({
    path: '/'
})
export class ImsDemo2Controller {

    @EntityRepository()
    user: EntityRepository<UserEntity>

    @Get()
    userInfo(user: UserEntity) {
        this.user.save(user);
    }
}
