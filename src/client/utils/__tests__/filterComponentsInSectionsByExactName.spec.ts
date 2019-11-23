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
		const result = filterComponentsInSectionsByExactName(sections, 'Image', true)[0];
		expect(result.components && result.components.map(x => x.name)).toEqual(['Image']);
	});
});
