declare const _default: ({
    test: RegExp;
    use: string[];
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
