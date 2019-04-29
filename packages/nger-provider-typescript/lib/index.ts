import { NgerCompilerTypescript } from './typescript';
import { StaticProvider } from 'nger-di';
import { NgerTransformers } from './transformer'
const staticProvider: StaticProvider[] = [{
    provide: NgerCompilerTypescript,
    useClass: NgerCompilerTypescript,
    deps: [NgerTransformers]
}, {
    provide: NgerTransformers,
    useClass: NgerTransformers,
    deps: []
}];

export default staticProvider;

export { NgerCompilerTypescript }