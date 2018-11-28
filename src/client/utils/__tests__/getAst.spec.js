import getAst from '../getAst';

describe('getAst', () => {
	test('return AST', () => {
		const result = getAst(`42`);
		expect(result).toMatchSnapshot();
	});
});
