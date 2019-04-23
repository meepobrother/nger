import { Entity, PrimaryGeneratedColumn, Column } from 'nger-core';
// 角色表
@Entity({
    name: 'ims_addon_role'
})
export class ImsAddonRole {
    /** 模块id */
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;
}
