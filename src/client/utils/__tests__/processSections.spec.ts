import deepfreeze from 'deepfreeze';
import processSections from '../processSections';

const sections = deepfreeze([
	{
		sections: [
			{
				name: 'Components',
				slug: 'components',
				components: [
					{
						slug: 'button',
						props: {
							displayName: 'Button',
						},
					},
				],
			},
		],
	},
]);

const options = { useRouterLinks: false, hashPath: [] };

describe('processSections', () => {
	it('should recursively process all sections and components', () => {
		const result = processSections(sections, options);
		const sectionsExpected = result[0].sections || [];
		const comp = sectionsExpected.length
			? sectionsExpected[0].components && sectionsExpected[0].components[0]
			: undefined;
		expect(comp?.name).toBe('Button');
		expect(comp?.href).toBe('/#button');
	});

	it('should set visibleName property on each section', () => {
		const result = processSections(sections, options);
		const sectionsExpected = result[0].sections || [];
		expect(sectionsExpected[0].visibleName).toBe('Components');
	});
});
