import { Entity } from 'nger-core'

@Entity()
export class NgerTask { 
    id: number;
    title: string;
    desc: string;
}