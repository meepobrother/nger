import { Entity, PrimaryGeneratedColumn } from 'nger-core';

@Entity({
    name: 'ims_demo'
})
export class ImsDemoEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
