import transpileImports from '../transpileImports';

describe('transpileImports', () => {
	test('transpile import statement starting with number', () => {
		const result = transpileImports(`import Component from '1-numbered-directory/component.jsx'`);
		expect(result).toMatchInlineSnapshot(`
"const _1_numbered_directory_component_jsx$0 = require('1-numbered-directory/component.jsx');
const _Component = _1_numbered_directory_component_jsx$0.default || _1_numbered_directory_component_jsx$0;"
`);
	});
	test('transpile default imports', () => {
		const result = transpileImports(`import B from 'cat'`);
		expect(result).toMatchInlineSnapshot(`
"const _cat$0 = require('cat');
const _B = _cat$0.default || _cat$0;"
`);
	});

	test('transpile named imports', () => {
		const result = transpileImports(`import {B} from 'cat'`);
		expect(result).toMatchInlineSnapshot(`
"const _cat$0 = require('cat');
const _B = _cat$0.B;"
`);
	});

	test('transpile mixed imports', () => {
		const result = transpileImports(`import A, {B} from 'cat'`);
		expect(result).toMatchInlineSnapshot(`
"const _cat$0 = require('cat');
const _A = _cat$0.default || _cat$0;
const _B = _cat$0.B;"
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
const _cat$0 = require('cat');
const _B = _cat$0.default || _cat$0;
// Absolutely not important comment
const _capybara$0 = require('capybara');
const _C = _capybara$0.default || _capybara$0;
const _hamster$0 = require('hamster');
const _D = _hamster$0.default || _hamster$0; // One more comment
const _snake$0 = require('snake');
const _E = _snake$0.default || _snake$0;
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
"const _cat$0 = require('cat');
const _B = _cat$0.B;
const _C = _cat$0.C;
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
"const _cat$0 = require('cat');
const _B = _cat$0.B;
const _C = _cat$0.C;
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
	"const _${transpiled}$0 = require('${modulePath}');
	const _B = _${transpiled}$0.default || _${transpiled}$0;"
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
