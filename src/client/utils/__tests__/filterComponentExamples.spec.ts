import filterComponentExamples from '../filterComponentExamples';

const component = {
	props: {
		examples: ['a', 'b', 'c', 'd'],
	},
	other: 'info',
} as any;

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
