import deepfreeze from 'deepfreeze';
import filterSectionExamples from '../filterSectionExamples';

const section = deepfreeze({
	content: ['a', 'b', 'c', 'd'],
	other: 'info',
});

describe('filterSectionExamples', () => {
	it('should return a shallow copy of a section with example filtered by given index', () => {
		const result = filterSectionExamples(section as any, 2);
		expect(result).toEqual({
			content: ['c'],
			other: 'info',
		});
	});
});
