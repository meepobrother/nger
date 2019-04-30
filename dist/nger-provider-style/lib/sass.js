Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const node_sass_1 = tslib_1.__importDefault(require("node-sass"));
/** 代码合并 */
const scss_bundle_1 = require("scss-bundle");
let NgerCompilerSass = class NgerCompilerSass {
    compile(content, config) {
        return new Promise(async (resolve, reject) => {
            let bundledContent = '';
            const { resource, projectDirectory } = config;
            if (resource && projectDirectory) {
                const getBundleContent = async (url) => {
                    const bundler = new scss_bundle_1.Bundler(undefined, projectDirectory);
                    const res = await bundler.Bundle(url);
                    bundledContent += res.bundledContent;
                };
                try {
                    if (typeof resource === 'string') {
                        await getBundleContent(resource);
                    }
                    else if (Array.isArray(resource)) {
                        for (let url of resource) {
                            await getBundleContent(url);
                        }
                    }
                }
                catch (e) {
                    reject(e);
                }
            }
            const opts = {
                ...config,
                data: bundledContent ? bundledContent + content : content
            };
            node_sass_1.default.render(opts, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.css.toString('utf8'));
                }
            });
        });
    }
};
NgerCompilerSass = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerSass);
exports.NgerCompilerSass = NgerCompilerSass;
