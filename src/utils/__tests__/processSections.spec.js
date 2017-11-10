import deepfreeze from 'deepfreeze';
import processSections from '../processSections';

const sections = deepfreeze([
	{
		sections: [
			{
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
		expect(result[0].sections[0].components[0].name).toBe('Button');
	});
});
