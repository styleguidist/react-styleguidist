import { ASTNode, builders as b } from 'ast-types';

export interface RequireItObject {
	require: string;
	toAST(): ASTNode;
}

/**
 * Return a require() statement AST.
 *
 * @param {string} filepath Module name.
 * @returns {object}
 */
export default function requireIt(filepath: string): RequireItObject {
	const obj = { require: filepath };
	Object.defineProperty(obj, 'toAST', {
		enumerable: false,
		value() {
			return b.callExpression(b.identifier('require'), [b.literal(filepath)]);
		},
	});
	return obj as RequireItObject;
}
