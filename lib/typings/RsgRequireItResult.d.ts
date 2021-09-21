import { ASTNode } from 'ast-types';
export interface RequireItResult {
    require: string;
    toAST(): ASTNode;
}
