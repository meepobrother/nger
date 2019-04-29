import { NgModuleBootstrap, FileSystem, Logger, NgModuleRef, ComponentMetadataKey, ComponentClassAst } from 'nger-core';
import { parseTemplate } from '@angular/compiler';
import { join } from 'path';
export class NgerPlatformNode extends NgModuleBootstrap {
    constructor(public fs: FileSystem, public logger: Logger) {
        super();
    }
    async run(ref: NgModuleRef<any>) {
        await Promise.all(ref.componentFactoryResolver.getComponents().map(async context => {
            this.logger.debug(context.target.name)
        //     const component = context.getClass(ComponentMetadataKey) as ComponentClassAst;
        //     const def = component.ast.metadataDef;
        //     let { sourceRoot, templateUrl, template, styleUrls, styles } = def;
        //     if (sourceRoot && templateUrl) {
        //         const templatePath = join(sourceRoot, templateUrl);
        //         template = this.fs.readFileSync(templatePath).toString()
        //     }
        //     if (template) {
        //         const res = parseTemplate(template, templateUrl || '');
        //     }
        //     this.logger.info({
        //         sourceRoot, templateUrl, template, styleUrls, styles
        //     })
        //     return;
        }));
        // return;
    }
}