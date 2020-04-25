import { builders as b } from 'ast-types';
import requireIt from './requireIt';

/**
 * Resolve ES5 requires for export default, named export and module.exports
 *
 * @param requireRequest the argument of the `require` function
 * @param name the name of the resulting variable
 * @returns AST
 */
export default (requireRequest: string, name: string) => [
	// const name$0 = require(path);
	b.variableDeclaration('const', [
		b.variableDeclarator(b.identifier(`${name}$0`), requireIt(requireRequest).toAST() as any),
	]),
	// const name = name$0.default || name$0[name] || name$0;
	b.variableDeclaration('const', [
		b.variableDeclarator(
			b.identifier(name),
			b.logicalExpression(
				'||',
				b.identifier(`${name}$0.default`),
				b.logicalExpression('||', b.identifier(`${name}$0['${name}']`), b.identifier(`${name}$0`))
			)
		),
	]),
];
