import { parseTemplate } from '@angular/compiler'
import { Injectable } from 'nger-core'
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
    parse(template: string, templateUrl: string, options?: ParseTemplateOptions) {
        return parseTemplate(template, templateUrl, options)
    }
}