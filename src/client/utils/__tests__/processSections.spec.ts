import deepfreeze from 'deepfreeze';
import processSections from '../processSections';

const sections = deepfreeze([
	{
		sections: [
			{
				name: 'Components',
				components: [
					{
						props: {
							displayName: 'Button',
						},
						module: 1,
					},
				],
			},
		],
	},
]);

describe('processSections', () => {
	it('should recursively process all sections and components', () => {
		const result = processSections(sections);
		const sectionsExpected = result[0].sections || [];
		expect(
			sectionsExpected.length &&
				sectionsExpected[0].components &&
				sectionsExpected[0].components[0].name
		).toBe('Button');
	});

	it('should set visibleName property on each section', () => {
		const result = processSections(sections);
		const sectionsExpected = result[0].sections || [];
		expect(sectionsExpected[0].visibleName).toBe('Components');
	});
});
