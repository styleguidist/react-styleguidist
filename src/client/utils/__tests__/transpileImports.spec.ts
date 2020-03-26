import transpileImports from '../transpileImports';

describe('transpileImports', () => {
	test('transpile default imports', () => {
		const result = transpileImports(`import B from 'cat'`);
		expect(result).toMatchInlineSnapshot(`
"const cat$0 = require('cat');
const B = cat$0.default || cat$0;"
`);
	});

	test('transpile named imports', () => {
		const result = transpileImports(`import {B} from 'cat'`);
		expect(result).toMatchInlineSnapshot(`
"const cat$0 = require('cat');
const B = cat$0.B;"
`);
	});

	test('transpile mixed imports', () => {
		const result = transpileImports(`import A, {B} from 'cat'`);
		expect(result).toMatchInlineSnapshot(`
"const cat$0 = require('cat');
const A = cat$0.default || cat$0;
const B = cat$0.B;"
`);
	});

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
const cat$0 = require('cat');
const B = cat$0.default || cat$0;
// Absolutely not important comment
const capybara$0 = require('capybara');
const C = capybara$0.default || capybara$0;
const hamster$0 = require('hamster');
const D = hamster$0.default || hamster$0; // One more comment
const snake$0 = require('snake');
const E = snake$0.default || snake$0;
"
`);
	});

	test('transpile multiline named imports without trailing comma', () => {
		const result = transpileImports(`import {
  B,
  C
} from 'cat'
`);
		expect(result).toMatchInlineSnapshot(`
"const cat$0 = require('cat');
const B = cat$0.B;
const C = cat$0.C;
"
`);
	});

	test('transpile multiline named imports with trailing comma', () => {
		const result = transpileImports(`import {
  B,
  C,
} from 'cat'
`);
		expect(result).toMatchInlineSnapshot(`
"const cat$0 = require('cat');
const B = cat$0.B;
const C = cat$0.C;
"
`);
	});

	describe.each([
		['./cat/capybara/hamster', '__cat_capybara_hamster'],
		['../cat/capybara/hamster', '___cat_capybara_hamster'],
		['cat/capybara/hamster', 'cat_capybara_hamster'],
	])('transpile default imports via relative path', (modulePath, transpiled) => {
		test(`${modulePath}`, () => {
			const result = transpileImports(`import B from '${modulePath}'`);
			expect(result).toMatchInlineSnapshot(`
	"const ${transpiled}$0 = require('${modulePath}');
	const B = ${transpiled}$0.default || ${transpiled}$0;"
	`);
		});
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
