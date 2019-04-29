export abstract class CustomElementRegistry {
    abstract define(name: string, constructor: Function, options?: ElementDefinitionOptions): void;
    abstract get(name: string): any;
    abstract upgrade(root: Node): void;
    abstract whenDefined(name: string): Promise<void>;
}