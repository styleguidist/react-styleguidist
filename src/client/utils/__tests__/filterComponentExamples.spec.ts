import deepfreeze from 'deepfreeze';
import filterComponentExamples from '../filterComponentExamples';
import * as Rsg from '../../../typings';

const examples: Rsg.Example[] = ['a', 'b', 'c', 'd'].map(x => ({ type: 'markdown', content: x }));

const component = deepfreeze({
	props: {
		examples,
	},
	other: 'info',
});

describe('filterComponentExamples', () => {
	it('should return a shallow copy of a component with example filtered by given index', () => {
		const result = filterComponentExamples(component, 2);
		expect(result).toEqual({
			props: {
				examples: [{ type: 'markdown', content: 'c' }],
			},
			other: 'info',
		});
	});
});
