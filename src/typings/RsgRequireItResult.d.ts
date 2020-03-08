import { ASTNode } from 'ast-types';

declare global {
	namespace Rsg {
		interface RequireItResult {
			require: string;
			toAST(): ASTNode;
		}
	}
}
