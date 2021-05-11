import findSection from '../findSection';
import * as Rsg from '../../../typings';

const sections: Rsg.Section[] = [
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

describe('findSection', () => {
	it('should return top level section', () => {
		const result = findSection(sections, 'General');
		expect(result).toEqual(sections[0]);
	});

	it('should return nested sections', () => {
		const result = findSection(sections, 'Particles');
		expect(result).toEqual(sections?.[0].sections?.[0]);
	});

	it('should return undefined when no sections found', () => {
		const result = findSection(sections, 'Pizza');
		expect(result).toBeFalsy();
	});
});
