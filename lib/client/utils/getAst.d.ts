import { Node, Options } from 'acorn';
export interface Program extends Node {
    body: Node[];
}
export declare const ACORN_OPTIONS: Options;
/**
 * Parse source code with Acorn and return AST, returns undefined in case of errors
 */
export default function getAst(code: string): Program | undefined;
