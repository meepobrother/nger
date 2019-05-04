declare const _default: {
    optimization: {
        runtimeChunk: string;
        minimizer: any[];
        splitChunks: {
            maxAsyncRequests: number;
            cacheGroups: {
                default: {
                    chunks: string;
                    minChunks: number;
                    priority: number;
                };
                common: {
                    name: string;
                    chunks: string;
                    minChunks: number;
                    enforce: boolean;
                    priority: number;
                };
                vendors: boolean;
                vendor: {
                    name: string;
                    chunks: string;
                    enforce: boolean;
                };
            };
        };
    };
};
export default _default;
