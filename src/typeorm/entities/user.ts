import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ImsUserGroup } from './user_group';
// 用户表
@Entity({
    name: 'ims_user'
})
export class ImsUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
    
    group: ImsUserGroup;

}
