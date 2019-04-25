# `nger-module-typeorm`

> 使用typeorm

## use
```ts
import {NgerModuleTypeorm} from 'nger-module-typeorm';
@NgModule({
    imports: [NgerModuleTypeorm],
    providers: [{
        provide: TypeormToken,
        useValue: ImsDemoTypeorm,
        multi: true
    },{
        provide: TypeormOptionsToken,
        useValue: {
            type: 'mysql',
            username: 'root',
            password: '123456',
            host: 'localhost',
            port: 4200,
            database: 'nger',
            name: 'nger'
        }
    }]
})
export class ImsDemo{}
```