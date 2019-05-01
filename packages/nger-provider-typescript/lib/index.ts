import { NgerCompilerTypescript } from 'nger-compiler';
import { StaticProvider } from 'nger-di';
import { NgerBabel } from './babel'
const staticProvider: StaticProvider[] = [{
    provide: NgerBabel,
    useClass: NgerBabel,
    deps: [NgerCompilerTypescript]
}, {
    provide: NgerCompilerTypescript,
    useClass: NgerCompilerTypescript,
    deps: []
}];
export default staticProvider;
export { NgerBabel, NgerCompilerTypescript }
