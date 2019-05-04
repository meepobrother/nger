import * as cli from '@angular/compiler-cli';
import ts from 'typescript';
export declare class NgerCompilerNgMetadata {
    getMetadata(file: string, compilerOptions?: ts.CompilerOptions): cli.ModuleMetadata | undefined;
    getNgModuleConfig(data: cli.ModuleMetadata): any;
    getControllerConfig(data: cli.ModuleMetadata): any;
    getComponentConfig(data: cli.ModuleMetadata): any;
    transformModuleMetadata(data: cli.ModuleMetadata): {
        [key: string]: any;
    };
    findDecorator(decorators: (cli.MetadataSymbolicExpression | cli.MetadataError)[], filter: (meta: cli.MetadataValue) => boolean): any;
}
