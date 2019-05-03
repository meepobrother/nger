import { Controller, Get } from 'nger-core'

@Controller({
    path: '/api'
})
export class NgerWelcomeController {
    @Get()
    getAllInstalled() {
        return [];
    }
}
