import deepfreeze from 'deepfreeze';
import filterComponentsByName from '../filterComponentsByName';

const components = deepfreeze([
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
]);

describe('filterComponentsByName', () => {
	it('should return initial list with empty query', () => {
		const result = filterComponentsByName(components, '');
		expect(result).toEqual(components);
	});

	it('should return filtered list, should ignore case', () => {
		const result = filterComponentsByName(components, 'button');
		expect(result).toEqual([{ name: 'Button' }]);
	});

	it('should return empty list when nothing found', () => {
		const result = filterComponentsByName(components, 'pizza');
		expect(result).toEqual([]);
	});

	it('should return all components if all of them match query', () => {
		// It doesn’t happen when RegExp has global flag for some reason
		const components2 = [
			{ name: 'Button' },
			{ name: 'CounterButton' },
			{ name: 'PushButton' },
			{ name: 'RandomButtom' },
			{ name: 'WrappedButton' },
		];
		const result = filterComponentsByName(components2, 'bu');
		expect(result).toEqual(components2);
	});
});
