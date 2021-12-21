import { Parser, Node as AcornNode, Options } from 'acorn';
export declare const ACORN_OPTIONS: Options;
/**
 * Parse source code with Acorn and return AST, returns undefined in case of errors
 */
export default function getAst(code: string, plugins?: ((BaseParser: typeof Parser) => typeof Parser)[]): AcornNode | undefined;
