import deepfreeze from 'deepfreeze';
import filterComponentsInSectionsBySlug from '../filterComponentsInSectionsBySlug';

const sections = deepfreeze([
	{
		slug: 'general',
		sections: [
			{
				slug: 'particles',
				components: [
					{
						slug: 'button',
					},
					{
						slug: 'image',
					},
				],
			},
		],
	},
]);

describe('filterComponentsInSectionsBySlug', () => {
	it('should return components at any level with exact slug', () => {
		const result = filterComponentsInSectionsBySlug(sections, 'image');
		expect(result.map(x => x.slug)).toEqual(['image']);
	});
});
