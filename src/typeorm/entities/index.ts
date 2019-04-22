import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'ims_demo'
})
export class ImsDemoEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
