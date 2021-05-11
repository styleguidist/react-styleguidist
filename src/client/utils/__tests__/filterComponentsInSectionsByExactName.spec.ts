import deepfreeze from 'deepfreeze';
import filterComponentsInSectionsByExactName from '../filterComponentsInSectionsByExactName';
import * as Rsg from '../../../typings';

const sectionsRaw: Rsg.Section[] = [
	{
		exampleMode: 'collapse',
		name: 'General',
		sections: [
			{
				exampleMode: 'collapse',
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
];
const sections = deepfreeze(sectionsRaw);

describe('filterComponentsInSectionsByExactName', () => {
	it('should return components at any level with exact name', () => {
		const result = filterComponentsInSectionsByExactName(sections, 'Image', true)[0];
		expect(result.components && result.components.map((x) => x.name)).toEqual(['Image']);
	});
});
