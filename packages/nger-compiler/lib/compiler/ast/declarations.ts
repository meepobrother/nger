import { isMetadataImportedSymbolReferenceExpression } from '@angular/compiler-cli';
export function createDeclarations(items: any[]) {
    items.map(it => {
        if (isMetadataImportedSymbolReferenceExpression(it)) {
            const { module, name } = it;
        } else {
            debugger;
        }
    })
}

