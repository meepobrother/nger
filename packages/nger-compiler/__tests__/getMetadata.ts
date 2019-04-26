import {
    getMetadata, isModuleMetadata, MetadataEntry,
    isClassMetadata, isMetadataSymbolicExpression,
    isMetadataSymbolicCallExpression, isMetadataSymbolicBinaryExpression,
    isMetadataImportedSymbolReferenceExpression, getNgModuleMetadata
} from '../lib/getMetadata';
import { join } from 'path';
const root = process.cwd();
const app = join(root, 'src/app.ts')
const args = getNgModuleMetadata(app);

debugger;