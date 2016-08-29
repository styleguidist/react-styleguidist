import test from 'ava';
const _ = require('lodash');
import * as utils from '../src/utils/utils';

let sourceGlobalLength;
test.beforeEach(() => {
	sourceGlobalLength = Object.keys(global).length;
});
test.afterEach(() => {
	delete global.Foo;
	delete global.Bar;
});

// setComponentsNames

test('should set name property to each component', t => {
	let result = utils.setComponentsNames([
		{
			module: {
				displayName: 'Foo',
			},
		},
		{
			module: {
				name: 'Bar',
			},
		},
		{
			module: {
				displayName: 'Foo',
			},
			props: {
				displayName: 'FooOverride',
			},
		},
	]);
	t.deepEqual(_.map(result, 'name'), ['Foo', 'Bar', 'FooOverride']);
});

// globalizeComponents

test('should set each component’s module as a global variable', t => {
	utils.globalizeComponents([
		{
			name: 'Foo',
			module: 13,
		},
		{
			name: 'Bar',
			module: 27,
		},
		{
			name: 'PathedFoo',
			module: { a: 32 },
			props: {
				path: 'a',
			},
		},
	]);
	t.is(Object.keys(global).length, sourceGlobalLength + 3);
	t.is(global.Foo, 13);
	t.is(global.Bar, 27);
	t.is(global.PathedFoo, 32);
});
