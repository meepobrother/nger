declare namespace Less {
}
interface LessStatic {
    options: Less.StaticOptions;
    importManager?: Less.ImportManager;
    sheets: HTMLLinkElement[];
    modifyVars(vars: {
        [name: string]: string;
    }): Promise<Less.RefreshOutput>;
    refreshStyles(): void;
    render(input: string, callback: (error: Less.RenderError, output: Less.RenderOutput) => void): void;
    render(input: string, options: Less.Options, callback: (error: Less.RenderError, output: Less.RenderOutput) => void): void;
    render(input: string): Promise<Less.RenderOutput>;
    render(input: string, options: Less.Options): Promise<Less.RenderOutput>;
    refresh(reload?: boolean, modifyVars?: {
        [variable: string]: string;
    }, clearFileCache?: boolean): Promise<Less.RefreshOutput>;
    version: number[];
    watch(): void;
}
