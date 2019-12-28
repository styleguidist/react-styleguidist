import { generate } from 'escodegen';
import { builders as b } from 'ast-types';
import resolveES6 from '../resolveES6';

it('resolveES6 should return an array of AST', () => {
	const result = resolveES6('path/to/module', 'NameOfVar');

	expect(generate(b.program(result))).toMatchInlineSnapshot(`
		"const NameOfVar$0 = require('path/to/module');
		const NameOfVar = NameOfVar$0['NameOfVar'] || (NameOfVar$0.default || NameOfVar$0);"
	`);
});
