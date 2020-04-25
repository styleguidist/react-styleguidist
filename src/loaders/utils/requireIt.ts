import { builders as b, ASTNode } from 'ast-types';
import * as Rsg from '../../typings';

/**
 * Return a require() statement AST.
 *
 * @param {string} filepath Module name.
 * @returns {object}
 */
export default function requireIt(filepath: string): Rsg.RequireItResult {
	const obj = { require: filepath };
	Object.defineProperty(obj, 'toAST', {
		enumerable: false,
		value(): ASTNode {
			return b.callExpression(b.identifier('require'), [b.literal(filepath)]);
		},
	});
	return obj as Rsg.RequireItResult;
}
