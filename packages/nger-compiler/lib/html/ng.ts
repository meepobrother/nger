import { parseTemplate } from '@angular/compiler'
import { Injectable } from 'nger-core'
import { Node } from '@angular/compiler/src/render3/r3_ast'
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
@Injectable()
export class NgerCompilerNgTemplate {
    parse(template: string, templateUrl: string, options?: ParseTemplateOptions): Node[] {
        const nodes = parseTemplate(template, templateUrl, options).nodes
        return nodes;
    }
}

export { Node }