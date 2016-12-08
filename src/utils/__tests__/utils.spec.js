const map = require('lodash/map');
import * as utils from '../utils';

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
beforeEach(() => {
	sourceGlobalLength = Object.keys(global).length;
});
afterEach(() => {
	delete global.Foo;
	delete global.Bar;
});

// setComponentsNames

it('should set name property to each component', () => {
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
	expect(map(result, 'name')).toEqual(['Foo', 'Bar', 'FooOverride']);
});

// globalizeComponents

it('should set each component’s module as a global variable', () => {
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
	expect(Object.keys(global).length).toBe(sourceGlobalLength + 3);
	expect(global.Foo).toBe(13);
	expect(global.Bar).toBe(27);
	expect(global.PathedFoo).toBe(32);
});

// getFilterRegExp

it('should return a RegExp', () => {
	const result = utils.getFilterRegExp('');
	expect(result instanceof RegExp).toBe(true);
});

it('RegExp should fuzzy match a string', () => {
	const result = utils.getFilterRegExp('btn');
	expect('button').toMatch(result);
});

it('RegExp should not match when string is different', () => {
	const result = utils.getFilterRegExp('buttons');
	expect('button').not.toMatch(result);
});

it('should not throw when query contains special characters', () => {
	const fn = () => utils.getFilterRegExp('\\');
	expect(fn).not.toThrow();
});

it('RegExp should ignore non-alphanumeric characters', () => {
	const result = utils.getFilterRegExp('#$b()tn');
	expect('button').toMatch(result);
});

// filterComponentsByName

it('should return initial list with empty query', () => {
	const result = utils.filterComponentsByName(COMPONENTS, '');
	expect(result).toEqual(COMPONENTS);
});

it('should return filtered list, should ignore case', () => {
	const result = utils.filterComponentsByName(COMPONENTS, 'button');
	expect(result).toEqual([{ name: 'Button' }]);
});

it('should return empty list when nothing found', () => {
	const result = utils.filterComponentsByName(COMPONENTS, 'pizza');
	expect(result).toEqual([]);
});

// filterComponentsByExactName

it('should return components with exact name', () => {
	const result = utils.filterComponentsByExactName(COMPONENTS, 'Image');
	expect(result).toEqual([COMPONENTS[1]]);
});

// filterComponentsInSectionsByExactName

it('should return components at any level with exact name', () => {
	const result = utils.filterComponentsInSectionsByExactName(SECTIONS, 'Image');
	expect(result).toEqual([COMPONENTS[1]]);
});

// getComponentNameFromHash

it('should return important part of hash if it contains component name', () => {
	const result = utils.getComponentNameFromHash('#!/Button');
	expect(result).toEqual({ targetComponentName: 'Button', targetComponentIndex: null });
});

it('should return an empty object if hash contains no component name', () => {
	const result = utils.getComponentNameFromHash('Button');
	expect(result).toEqual({});
});

// filterComponentExamples

it('should return a shallow copy of the component with example filtered by given index', () => {
	const comp = { examples: ['a', 'b', 'c', 'd'], other: 'info' };
	const expectedOutput = { examples: ['c'], other: 'info' };
	const result = utils.filterComponentExamples(comp, 2);
	expect(result).toEqual(expectedOutput);
});
