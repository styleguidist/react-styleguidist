import acornJsx from 'acorn-jsx';
import getAst from '../getAst';

describe('getAst', () => {
	test('return AST', () => {
		const result = getAst(`42`);
		expect(result).toHaveProperty('type', 'Program');
	});

	test('accept Acorn plugins', () => {
		const result = getAst(`<X />`, [acornJsx()]);
		expect(result).toHaveProperty('type', 'Program');
	});

	test('understands new ECMAScript syntax', () => {
		const result = getAst(`foo?.bar?.baz()`);
		expect(result).toHaveProperty('type', 'Program');
	});

	test('understands TypeScript', () => {
		const result = getAst(`const pizza = [1, 2, 3] as const`);
		expect(result).toHaveProperty('type', 'Program');
	});
});
