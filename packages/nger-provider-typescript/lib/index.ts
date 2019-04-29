import { NgerCompilerTypescript } from './typescript';
import { StaticProvider } from 'nger-di';

const staticProvider: StaticProvider[] = [{
    provide: NgerCompilerTypescript,
    useClass: NgerCompilerTypescript,
    deps: []
}];

export default staticProvider;

export { NgerCompilerTypescript }