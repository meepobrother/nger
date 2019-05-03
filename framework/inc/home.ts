import { Controller, Get } from 'nger-core'

// 首页
@Controller({
    path: '/api'
})
export class NgerHome {
    @Get()
    getSystemInfo() { }
}
