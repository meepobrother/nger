import { Injectable } from 'nger-core';
import webpackMerge, {
    CustomizeOptions, ConfigurationMergeFunction,
    MultipleConfigurationMergeFunction, UniqueFunction,
    MergeStrategy
} from 'webpack-merge';
import { Configuration } from 'webpack';
@Injectable()
export class WebpackMergeService {

    unique: UniqueFunction = webpackMerge.unique;

    smart: ConfigurationMergeFunction = webpackMerge.smart;

    multiple: MultipleConfigurationMergeFunction = webpackMerge.multiple;

    merge(...configs: Configuration[]): Configuration {
        return webpackMerge(...configs)
    }

    create(customizeOptions: CustomizeOptions): ConfigurationMergeFunction {
        return webpackMerge(customizeOptions)
    }

    strategy(options: { [field: string]: MergeStrategy }): ConfigurationMergeFunction {
        return webpackMerge.strategy(options)
    }

    smartStrategy(options: { [key: string]: MergeStrategy }): ConfigurationMergeFunction {
        return webpackMerge.smartStrategy(options)
    }
}
