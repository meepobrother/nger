import * as ts from 'typescript/lib/tsserverlibrary';
import { LanguageServiceProxyBuilder } from './language-service-proxy-builder';
function create(info: ts.server.PluginCreateInfo): ts.LanguageService {

    const proxy = new LanguageServiceProxyBuilder(info)

    return proxy;
}
const moduleFactory: ts.server.PluginModuleFactory = (mod: { typescript: typeof ts }) => {
    return { create };
};

export = moduleFactory;