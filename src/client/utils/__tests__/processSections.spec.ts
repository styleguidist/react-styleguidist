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
	test('should recursively process all sections and components', () => {
		const result = processSections(sections, options);
		const sectionsExpected = result[0].sections || [];
		const comp = sectionsExpected.length
			? sectionsExpected[0].components && sectionsExpected[0].components[0]
			: undefined;
		expect(comp?.name).toBe('Button');
		expect(comp?.href).toBe('/#button');
	});

	test('should set visibleName property on each section', () => {
		const result = processSections(sections, options);
		const sectionsExpected = result[0].sections || [];
		expect(sectionsExpected[0].visibleName).toBe('Components');
	});

	test('should recursively process all nested sections when useRouterLinks is true has passed', () => {
		const result = processSections([{ name: 'Component', sections: [{ name: 'Button' }] }], {
			useRouterLinks: true,
		});
		expect(result?.[0].href).toBe('/#/Component');
		expect(result?.[0].sections?.[0].href).toBe('/#/Component/Button');
	});
});
