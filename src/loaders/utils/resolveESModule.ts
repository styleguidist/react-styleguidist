import { builders as b } from 'ast-types';
import requireIt from './requireIt';

/**
 * resolve es5 requires for export default, export name and module.exports
 * @param requireRequest the param of the `require` function
 * @param name the name of the resulting variable
 * @returns an array of ast to be used in an AST program.
 */
export default (requireRequest: string, name: string) => [
	// const name$0 = require(path);
	b.variableDeclaration('const', [
		b.variableDeclarator(b.identifier(`${name}$0`), requireIt(requireRequest).toAST() as any),
	]),
	// const name = name$0[name] || name$0.default || name$0;
	b.variableDeclaration('const', [
		b.variableDeclarator(
			b.identifier(name),
			b.logicalExpression(
				'||',
				b.identifier(`${name}$0['${name}']`),
				b.logicalExpression('||', b.identifier(`${name}$0.default`), b.identifier(`${name}$0`))
			)
		),
	]),
];
