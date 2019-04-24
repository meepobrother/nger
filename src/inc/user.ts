import { Controller, Inject, Get } from 'nger-core';
import { HomeController } from './home'
@Controller('/user')
export class UserController {
    constructor(@Inject() public home: HomeController) { }

    @Get()
    info() {
        return this.home.userInfo();
    }
}