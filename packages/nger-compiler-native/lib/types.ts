export interface NgModuleConfig {
    declarations: any[],
    providers: any[],
    imports: any[],
    bootstrap: any[],
    sourceRoot: any;
}
export interface NgerComponentConfig {
    selector: string;
    templateUrl: string;
    template: string;
    styleUrls: string[];
    styles: string[];
    sourceRoot: string;
}
export type NgerControllerConfig = (string | {
    path: string;
}) & { sourceRoot: string }
