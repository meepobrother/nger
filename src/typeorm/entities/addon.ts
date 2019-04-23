import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'nger-core';
// 角色表
@Entity({
    name: 'ims_group'
})
export class ImsAddon {
    /** 模块id */
    @PrimaryGeneratedColumn()
    id: number;

    /** 模块代号 */
    @Column()
    code: string;

    /** 模块作者 */
    @Column()
    author: string;

    /** 模块版本号 */
    @Column()
    version: string;

    @UpdateDateColumn({
        type: 'timestamp',
        comment: '模块最后更新时间'
    })
    updateDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        comment: '模块安装时间'
    })
    createDate: Date;
}
