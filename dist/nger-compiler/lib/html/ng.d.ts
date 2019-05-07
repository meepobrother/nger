import { Node, Visitor } from '@angular/compiler/src/render3/r3_ast';
export interface ParseTemplateOptions {
    preserveWhitespaces?: boolean;
    interpolationConfig?: InterpolationConfig;
}
export declare class InterpolationConfig {
    start: string;
    end: string;
    static fromArray(markers: [string, string] | null): InterpolationConfig;
    constructor(start: string, end: string);
}
export declare class NgerCompilerNgTemplate {
    parse(template: string, templateUrl: string, options?: ParseTemplateOptions): Node[];
}
export { Node, Visitor };
