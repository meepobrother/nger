import { Entity, Validate, Column } from 'nger-core'

@Entity()
export class UserEntity {
    @Validate((val: string, that: UserEntity) => {
        if (val.length < 6) {
            return {
                status: 0,
                message: '用户名不能小于6位'
            }
        }
    })
    @Column()
    username: string;

}