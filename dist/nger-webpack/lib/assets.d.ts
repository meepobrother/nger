declare const _default: ({
    test: RegExp;
    use: ({
        loader: string;
        options?: undefined;
    } | {
        loader: string;
        options: {
            ident: string;
            plugins: import("postcss").Transformer[];
        };
    })[];
} | {
    test: RegExp;
    use: {
        loader: string;
        options: {
            name: string;
            limit: number;
        };
    }[];
})[];
export default _default;
