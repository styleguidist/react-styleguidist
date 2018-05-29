import deepfreeze from 'deepfreeze';
import filterComponentsBySlug from '../filterComponentsBySlug';

const components = deepfreeze([
	{
		slug: 'button',
	},
	{
		slug: 'image',
	},
]);

describe('filterComponentsBySlug', () => {
	it('should return components with exact slug', () => {
		const result = filterComponentsBySlug(components, 'image');
		expect(result.map(x => x.slug)).toEqual(['image']);
	});
});
