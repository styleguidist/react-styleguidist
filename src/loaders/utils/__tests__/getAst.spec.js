import acornJsx from 'acorn-jsx/inject';
import getAst from '../getAst';

describe('getAst', () => {
	test('return AST', () => {
		const result = getAst(`42`);
		expect(result).toMatchSnapshot();
	});

	test('accept Acorn plugins', () => {
		const result = getAst(`<X />`, {
			jsx: acornJsx,
		});
		expect(result).toMatchSnapshot();
	});
});
