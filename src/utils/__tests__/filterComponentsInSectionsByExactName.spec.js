import deepfreeze from 'deepfreeze';
import filterComponentsInSectionsByExactName from '../filterComponentsInSectionsByExactName';

const sections = deepfreeze([
	{
		name: 'General',
		sections: [
			{
				name: 'Particles',
				components: [
					{
						name: 'Button',
					},
					{
						name: 'Image',
					},
				],
			},
		],
	},
]);

describe('filterComponentsInSectionsByExactName', () => {
	it('should return components at any level with exact name', () => {
		const result = filterComponentsInSectionsByExactName(sections, 'Image', true);
		expect(result[0].components.map(x => x.name)).toEqual(['Image']);
	});
});
