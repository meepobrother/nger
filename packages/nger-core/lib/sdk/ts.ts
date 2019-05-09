import ts from 'ts-morph'
import { InjectionToken } from 'nger-di';
import { Inject } from '../decorators/inject';
export const TSMORPH = new InjectionToken<typeof ts>(`TSMORPH`);
export class ProjectFactory {
    constructor(@Inject(TSMORPH) public h: typeof ts) { }
    create(root: string): ts.Project {
        const project = new this.h.Project();
        project.addExistingSourceFiles(`${root}/**/*{.ts,.tsx}`)
        return project;
    }
}