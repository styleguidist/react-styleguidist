import test from 'ava';
const _ = require('lodash');
import * as utils from '../src/utils/utils';

const COMPONENTS = [
	{
		name: 'Button',
	},
	{
		name: 'Image',
	},
	{
		name: 'Input',
	},
	{
		name: 'Link',
	},
	{
		name: 'Textarea',
	},
];

const SECTIONS = [
	{
		name: 'General',
		sections: [
			{
				name: 'Particles',
				components: [
					{
						name: 'Button',
					},
					{
						name: 'Image',
					},
				],
			},
		],
	},
];

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
	const result = utils.setComponentsNames([
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

// getFilterRegExp

test('should return a RegExp', t => {
	const result = utils.getFilterRegExp('');
	t.true(result instanceof RegExp);
});

test('RegExp should fuzzy match a string', t => {
	const result = utils.getFilterRegExp('btn');
	t.regex('button', result);
});

test('RegExp should not match when string is different', t => {
	const result = utils.getFilterRegExp('buttons');
	t.notRegex('button', result);
});

test('should not throw when query contains special characters', t => {
	const fn = () => utils.getFilterRegExp('\\');
	t.notThrows(fn);
});

test('RegExp should ignore non-alphanumeric characters', t => {
	const result = utils.getFilterRegExp('#$b()tn');
	t.regex('button', result);
});

// filterComponentsByName

test('should return initial list with empty query', t => {
	const result = utils.filterComponentsByName(COMPONENTS, '');
	t.deepEqual(result, COMPONENTS);
});

test('should return filtered list, should ignore case', t => {
	const result = utils.filterComponentsByName(COMPONENTS, 'button');
	t.deepEqual(result, [{ name: 'Button' }]);
});

test('should return empty list when nothing found', t => {
	const result = utils.filterComponentsByName(COMPONENTS, 'pizza');
	t.deepEqual(result, []);
});

// filterComponentsByExactName

test('should return components with exact name', t => {
	const result = utils.filterComponentsByExactName(COMPONENTS, 'Image');
	t.deepEqual(result, [COMPONENTS[1]]);
});

// filterComponentsInSectionsByExactName

test('should return components at any level with exact name', t => {
	const result = utils.filterComponentsInSectionsByExactName(SECTIONS, 'Image');
	t.deepEqual(result, [COMPONENTS[1]]);
});

// getComponentNameFromHash

test('should return important part of hash if it contains component name', t => {
	const result = utils.getComponentNameFromHash('#!/Button');
	t.deepEqual(result, { targetComponentName: 'Button', targetComponentIndex: null });
});

test('should return an empty object if hash contains no component name', t => {
	const result = utils.getComponentNameFromHash('Button');
	t.deepEqual(result, {});
});

// filterComponentExamples

test('should return a shallow copy of the component with example filtered by given index', t => {
	const comp = { examples: ['a', 'b', 'c', 'd'], other: 'info' };
	const expectedOutput = { examples: ['c'], other: 'info' };
	const result = utils.filterComponentExamples(comp, 2);
	t.deepEqual(result, expectedOutput);
});
