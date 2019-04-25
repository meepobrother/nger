import { InjectionToken } from 'nger-di'
import { Configuration } from 'webpack';
export const WebpackConfigToken = new InjectionToken<Configuration>(`WebpackConfigToken`)
