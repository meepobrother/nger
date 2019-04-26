import {
    BoundTarget, ConstantPool, CssSelector,
    DEFAULT_INTERPOLATION_CONFIG, DomElementSchemaRegistry,
    Expression, ExternalExpr, InterpolationConfig,
    ParseError, R3ComponentMetadata, R3TargetBinder, SelectorMatcher,
    Statement, TmplAstNode, WrappedNodeExpr, compileComponentFromMetadata,
    makeBindingParser, parseTemplate
} from '@angular/compiler';
export interface LexerRange {
    startPos: number;
    startLine: number;
    startCol: number;
    endPos: number;
}
import * as path from 'path';
import * as ts from 'typescript';
