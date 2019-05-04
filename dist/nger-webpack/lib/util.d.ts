import * as ts from 'typescript';
export declare function isDifferentialLoadingNeeded(projectRoot: string, target?: ts.ScriptTarget): boolean;
export declare function isEs5SupportNeeded(projectRoot: string): boolean;
export declare function isDirectory(path: string): boolean;
export declare function findAllNodeModules(from: string, root?: string): string[];
