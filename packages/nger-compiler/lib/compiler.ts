import { visitor } from 'nger-core';
import { NgModuleClassAst, NgModuleMetadataKey, PageMetadataKey, PageClassAst, Type } from 'nger-core';
import fs from 'fs-extra';
import { join, dirname } from 'path';
import { parseTemplate } from '@angular/compiler';
// import { templateVisitor } from './template';
export function compiler(App: Type<any>, outputPath: string) {
    const context = visitor.visitType(App);
    if (context) {
        const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        const pages = ngModule.declarations.filter(it => !!it.getClass(PageMetadataKey));
        fs.ensureDirSync(outputPath);
        const weapp: {
            pages: string[];
        } = {
            pages: []
        }
        pages.map(page => {
            const pageAst = page.getClass(PageMetadataKey) as PageClassAst;
            const def = pageAst.ast.metadataDef;
            const path = pageAst.path;
            weapp.pages.push(path);
            const outputFile = join(outputPath, path);
            const outputDir = dirname(outputFile);
            fs.ensureDirSync(outputDir)
            fs.writeFileSync(outputFile + '.js', `Page({})`)
            fs.writeFileSync(outputFile + '.json', `{}`);

            let templateCode = ``;
            if (def.templateUrl) {
                templateCode = fs.readFileSync(join('', def.templateUrl)).toString('utf8')
            } else if (def.template) {
                templateCode = def.template;
            }
            const { nodes } = parseTemplate(templateCode, ``);
            fs.writeFileSync(outputFile + '.wxml', ``)
            fs.writeFileSync(outputFile + '.wxss', ``)
        });
        // 输出目录
        fs.writeFileSync(join(outputPath, 'app.json'), JSON.stringify(weapp, null, 2));
        fs.writeFileSync(join(outputPath, 'app.js'), `App({})`)
    }

}
