import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'nger-core';
// 角色表
@Entity({
    name: 'ims_group'
})
export class ImsGroup {
    @PrimaryGeneratedColumn()
    id: number;

    /** 用户 */
    @Column()
    uid: number;

    /** 设置 */
    @Column()
    setting: object;

    /**类型 */
    @Column()
    type: 'ali' | 'juhe';
}
