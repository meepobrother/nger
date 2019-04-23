import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'nger-core';
import { ImsGroup } from './group';

// 角色权限表
@Entity({
    name: 'ims_group_role'
})
export class ImsGroupRole {
    /** 权限id */
    @PrimaryGeneratedColumn()
    id: number;

    /** 权限代号 方便程序判断 */
    @Column()
    code: string;

    /** 权限名称 方便运营人员辨识 */
    @Column()
    title: string;

    /** 权限组，角色组 */
    @ManyToOne(type => ImsGroup, target => target.groupRoles)
    group: ImsGroup;

    @CreateDateColumn({
        type: 'timestamp',
        comment: '创建时间'
    })
    createDate: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        comment: '最后修改时间'
    })
    updateDate: Date;
}
