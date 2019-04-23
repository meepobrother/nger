import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { ImsGroupRole } from './group_role';
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
