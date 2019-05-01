import {
    NodeJsInputFileSystem,
    CachedInputFileSystem,
    ResolverFactory
} from 'enhanced-resolve';

// create a resolver
/**
 *  alias?: AliasItem[] | Dictionary<string>;
    aliasFields?: string[];
    cachePredicate?: (val: ResolverRequest) => boolean;
    descriptionFiles?: string[];
    enforceExtension?: boolean;
    enforceModuleExtension?: boolean;
    extensions?: string[];
    fileSystem?: AbstractInputFileSystem;
    mainFields?: string[];
    mainFiles?: string[];
    moduleExtensions?: string[];
    modules?: string[];
    plugins?: Tapable.Plugin[];
    resolver?: Resolver;
    resolveToContext?: boolean;
    symlinks?: string[] | boolean;
    unsafeCache?: boolean | Dictionary<any>;
    useSyncFileSystemCalls?: boolean;
 */
const myResolver = ResolverFactory.createResolver({
    // Typical usage will consume the `NodeJsInputFileSystem` + `CachedInputFileSystem`, which wraps the Node.js `fs` wrapper to add resilience + caching.
    fileSystem: new CachedInputFileSystem(new NodeJsInputFileSystem(), 4000),
    extensions: ['.ts', '.js', '.json']
    /* any other resolver options here. Options/defaults can be seen below */
});

// resolve a file with the new resolver
const _context = {};
const resolveContext = {};
const lookupStartPath = process.cwd();
const request = './src/server';
myResolver.resolve({}, lookupStartPath, request, resolveContext, (err/*Error*/, filepath/*string*/) => {
    // Do something with the path
    console.log({ err, filepath })
    debugger;
});