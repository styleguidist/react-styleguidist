import { generate } from 'escodegen';
import requireIt from '../requireIt';

it('requireIt() should return an AST for require statement', () => {
	const result = requireIt('foo');

	expect(result).toBeTruthy();
	expect(typeof result.toAST).toBe('function');
	expect(generate(result.toAST())).toBe("require('foo')");
});
