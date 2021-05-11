import deepfreeze from 'deepfreeze';
import processSections from '../processSections';
import * as Rsg from '../../../typings';

const sectionsRaw: Rsg.Section[] = [
	{
		exampleMode: 'collapse',
		sections: [
			{
				exampleMode: 'collapse',
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
];
const sections = deepfreeze(sectionsRaw);

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
		const result = processSections(
			[
				{
					exampleMode: 'collapse',
					name: 'Component',
					sections: [{ exampleMode: 'collapse', name: 'Button' }],
				},
			],
			{
				useRouterLinks: true,
			}
		);
		expect(result?.[0].href).toBe('/#/Component');
		expect(result?.[0].sections?.[0].href).toBe('/#/Component/Button');
	});
});
