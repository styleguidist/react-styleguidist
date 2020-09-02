import { builders as b } from 'ast-types';
import requireIt from './requireIt';

/**
 * Resolve ES5 requires for export default, named export and module.exports
 *
 * @param requireRequest the argument of the `require` function
 * @param name the name of the resulting variable
 * @returns AST
 */
export default (requireRequest: string, name: string) => {
	// The name could possibly contain invalid characters for a JS variable name
	// such as "." or "-". 
	const safeName = name ? name.replace(/\W/, '') : name;

	return [
		// const safeName$0 = require(path);
		b.variableDeclaration('const', [
			b.variableDeclarator(b.identifier(`${safeName}$0`), requireIt(requireRequest).toAST() as any),
		]),
		// const safeName = safeName$0.default || safeName$0[safeName] || safeName$0;
		b.variableDeclaration('const', [
			b.variableDeclarator(
				b.identifier(safeName),
				b.logicalExpression(
					'||',
					b.identifier(`${safeName}$0.default`),
					b.logicalExpression('||', b.identifier(`${safeName}$0['${safeName}']`), b.identifier(`${safeName}$0`))
				)
			),
		]),
	]
};
