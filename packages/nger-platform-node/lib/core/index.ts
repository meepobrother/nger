import { NgModuleBootstrap, Logger, FileSystem, NgModuleRef, ComponentMetadataKey, ComponentClassAst } from 'nger-core';
import { parseTemplate } from '@angular/compiler';
import { join } from 'path';

export class NgerPlatformNode extends NgModuleBootstrap {
    root: string = join(process.cwd(), 'src/template/mobile/');
    constructor(
        public fs: FileSystem,
        public logger: Logger
    ) {
        super();
    }
    async run(ref: NgModuleRef<any>) {
        this.logger.info(`running in platform node!`, ref.componentFactoryResolver.getComponents().length)
        ref.componentFactoryResolver.getComponents().map(async context => {
            this.logger.debug(context.target.name)
            const component = context.getClass(ComponentMetadataKey) as ComponentClassAst;
            if (component) {
                const def = component.ast.metadataDef;
                let { sourceRoot, templateUrl, template, styleUrls, styles } = def;
                if (sourceRoot && templateUrl) {
                    const templatePath = join(sourceRoot, templateUrl);
                    template = this.fs.readFileSync(templatePath).toString('utf8')
                }
                if (template) {
                    const res = parseTemplate(template, templateUrl || '');
                    const tempPath = join(this.root, '.temp');
                    this.fs.ensureDirSync(tempPath)
                    this.fs.writeFileSync(join(tempPath, 'nger.json'), JSON.stringify(res, null, 2))
                    this.logger.info({
                        sourceRoot, templateUrl, template, styleUrls, styles, res
                    })
                }
            }
        });
    }
}