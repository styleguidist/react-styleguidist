import deepfreeze from 'deepfreeze';
import filterComponentsByExactName from '../filterComponentsByExactName';

const components = deepfreeze([
	{
		name: 'Button',
	},
	{
		name: 'Image',
	},
]);

describe('filterComponentsByExactName', () => {
	it('should return components with exact name', () => {
		const result = filterComponentsByExactName(components, 'Image');
		expect(result.map(x => x.name)).toEqual(['Image']);
	});
});
