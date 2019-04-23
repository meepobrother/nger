import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'nger-core';
import { ImsGroupRole } from './group_role';
// 角色表
@Entity({
    name: 'ims_group'
})
export class ImsGroup {
    @PrimaryGeneratedColumn()
    id: number;

    /** 角色名 */
    @Column()
    groupName: string;

    /** 角色简介 */
    @Column()
    groupDesc: string;

    /** 用户组权限 */
    @OneToMany(type => ImsGroupRole, target => target.group, {
        cascade: ['update']
    })
    groupRoles: ImsGroupRole[]
}
