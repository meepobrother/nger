import { Typeorm } from 'nger-core'
    import entities from './entities'
    @Typeorm({
        entities: [
            ...entities
        ],
        migrations: [],
        subscribers: []
    })
    export class ImsDemo2Typeorm { }
    