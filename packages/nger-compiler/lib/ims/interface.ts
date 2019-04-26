export interface DirectiveMeta {
    name: string;
    isComponent: boolean;
    inputs: { [property: string]: string | [string, string] };
    outputs: { [property: string]: string };
    exportAs: string[] | null;
}