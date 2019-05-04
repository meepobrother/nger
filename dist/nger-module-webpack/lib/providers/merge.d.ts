import { CustomizeOptions, ConfigurationMergeFunction, MultipleConfigurationMergeFunction, UniqueFunction, MergeStrategy } from 'webpack-merge';
import { Configuration } from 'webpack';
export declare class WebpackMergeService {
    unique: UniqueFunction;
    smart: ConfigurationMergeFunction;
    multiple: MultipleConfigurationMergeFunction;
    merge(...configs: Configuration[]): Configuration;
    create(customizeOptions: CustomizeOptions): ConfigurationMergeFunction;
    strategy(options: {
        [field: string]: MergeStrategy;
    }): ConfigurationMergeFunction;
    smartStrategy(options: {
        [key: string]: MergeStrategy;
    }): ConfigurationMergeFunction;
}
