import { generate } from 'escodegen';
import { builders as b } from 'ast-types';
import resolveESModule from '../resolveESModule';

it('should return an array of AST', () => {
	const result = resolveESModule('path/to/module', 'NameOfVar');

	expect(generate(b.program(result))).toMatchInlineSnapshot(`
		"const NameOfVar$0 = require('path/to/module');
		const NameOfVar = NameOfVar$0.default || (NameOfVar$0['NameOfVar'] || NameOfVar$0);"
	`);
});
