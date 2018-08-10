import getRequires from '../getRequires';

test('find calls to require() in code', () => {
	expect(getRequires(`require('foo')`)).toEqual(['foo']);
	expect(getRequires(`require('./foo')`)).toEqual(['./foo']);
	expect(getRequires(`require('foo');require('bar')`)).toEqual(['foo', 'bar']);
});

test('find import statements in code', () => {
	expect(getRequires(`import A from 'pizza';`)).toEqual(['pizza']);
	expect(getRequires(`import A from './pizza';`)).toEqual(['./pizza']);
	expect(getRequires(`import { A as X, B } from 'lunch';`)).toEqual(['lunch']);
	expect(getRequires(`import A, { B as X, C } from 'lunch';`)).toEqual(['lunch']);
	expect(getRequires(`import A from 'foo';import B from 'bar';`)).toEqual(['foo', 'bar']);
});

test('ignore dynamic requires', () => {
	expect(getRequires(`require('foo' + 'bar')`)).toEqual([]);
});

test('work with JSX', () => {
	expect(getRequires(`const A = require('pizza');<Button/>`)).toEqual(['pizza']);
	expect(getRequires(`import A from 'pizza';<Button>foo</Button>`)).toEqual(['pizza']);
});
