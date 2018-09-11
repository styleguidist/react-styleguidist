import transpileImports from '../transpileImports';

describe('transpileImports', () => {
	test('transpile multiple import statements', () => {
		const result = transpileImports(`/**
* Some important comment
*/
import 'dog'
/* Less important comments */
import B from 'cat'
// Absolutely not important comment
import C from 'capybara'
import D from 'hamster' // One more comment
import E from 'snake'
`);
		expect(result).toMatchInlineSnapshot(`
"/**
* Some important comment
*/
require('dog');
/* Less important comments */
const B = require('cat');
// Absolutely not important comment
const C = require('capybara');
const D = require('hamster'); // One more comment
const E = require('snake');
"
`);
	});

	test('return code if there are no imports', () => {
		const code = `<Button />`;
		const result = transpileImports(code);
		expect(result).toEqual(code);
	});

	test('return code if there is an import and a syntax error', () => {
		const code = `import foo from 'foo';&`;
		const result = transpileImports(code);
		expect(result).toEqual(code);
	});
});
