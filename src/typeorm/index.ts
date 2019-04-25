export * from './entities'
import * as entities from './entities'
import { Typeorm } from 'nger-core';

@Typeorm({
    entities: entities
})
export class NgerRunnerTypeorm { }