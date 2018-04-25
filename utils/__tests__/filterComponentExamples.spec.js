import deepfreeze from 'deepfreeze';
import filterComponentExamples from '../filterComponentExamples';

const component = deepfreeze({
	props: {
		examples: ['a', 'b', 'c', 'd'],
	},
	other: 'info',
});

describe('filterComponentExamples', () => {
	it('should return a shallow copy of a component with example filtered by given index', () => {
		const result = filterComponentExamples(component, 2);
		expect(result).toEqual({
			props: {
				examples: ['c'],
			},
			other: 'info',
		});
	});
});
