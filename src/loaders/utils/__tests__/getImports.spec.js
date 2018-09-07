import getImports from '../getImports';

test('find calls to require() in code', () => {
	expect(getImports(`require('foo')`)).toEqual(['foo']);
	expect(getImports(`require('./foo')`)).toEqual(['./foo']);
	expect(getImports(`require('foo');require('bar')`)).toEqual(['foo', 'bar']);
});

test('find import statements in code', () => {
	expect(getImports(`import A from 'pizza';`)).toEqual(['pizza']);
	expect(getImports(`import A from './pizza';`)).toEqual(['./pizza']);
	expect(getImports(`import { A as X, B } from 'lunch';`)).toEqual(['lunch']);
	expect(getImports(`import A, { B as X, C } from 'lunch';`)).toEqual(['lunch']);
	expect(getImports(`import A from 'foo';import B from 'bar';`)).toEqual(['foo', 'bar']);
});

test('work with JSX', () => {
	expect(getImports(`const A = require('pizza');<Button/>`)).toEqual(['pizza']);
	expect(getImports(`import A from 'pizza';<Button>foo</Button>`)).toEqual(['pizza']);
});

test('allow comments', () => {
	expect(
		getImports(`
/**
 * Some important comment
 */
import A from 'dog'
/* Less important comments */
import B from 'cat'
// Absolutely not important comment
import C from 'capybara'
import D from 'hamster' // One more comment
import E from 'snake'
`)
	).toEqual(['dog', 'cat', 'capybara', 'hamster', 'snake']);
});

test('ignore dynamic requires', () => {
	expect(getImports(`require('foo' + 'bar')`)).toEqual([]);
});

test('ignore imports in comments', () => {
	expect(
		getImports(`
import A from 'pizza'
// import one from 'one';
/** import two from 'two' */
/* import three from 'three' */
/*
import four from 'four';
import five from 'five';
*/
`)
	).toEqual(['pizza']);
});

test('ignore imports in strings', () => {
	expect(
		getImports(`
import A from 'pizza'
const foo = "import foo from 'foo'"
const bar = 'import bar from "bar"'
const baz = \`import baz from 'baz'\`
`)
	).toEqual(['pizza']);
});

test('ignore imports in JSX', () => {
	expect(
		getImports(`
import A from 'pizza';
<p>import foo from 'foo'</p>
`)
	).toEqual(['pizza']);
});

test('ignore multiple root JSX elements', () => {
	expect(getImports(`<A /><B />`)).toEqual([]);
});

test('ignore syntax errors', () => {
	expect(getImports(`*`)).toEqual([]);
});
