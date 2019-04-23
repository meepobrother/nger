import { Entity, PrimaryGeneratedColumn } from 'nger-core';
import { ImsUser } from './user';
import { ImsGroup } from './group';
// 用户角色表
@Entity({
    name: 'ims_user_group'
})
export class ImsUserGroup {
    @PrimaryGeneratedColumn()
    id: number;

    user: ImsUser;

    group: ImsGroup;

}
