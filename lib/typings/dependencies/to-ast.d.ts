declare module 'to-ast' {
    import { ASTNode } from 'ast-types';
    function toAST(obj: any): ASTNode;
    export = toAST;
}
