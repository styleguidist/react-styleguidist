import findSection from '../findSection';

const sections = [
	{
		name: 'General',
		slug: 'general',
		sections: [
			{
				name: 'Particles',
				slug: 'particles',
				components: [
					{
						name: 'Button',
						slug: 'button',
					},
					{
						name: 'Image',
						slug: 'image',
					},
				],
			},
		],
	},
];

describe('findSection', () => {
	it('should return top level section', () => {
		const result = findSection(sections, 'general');
		expect(result).toEqual(sections[0]);
	});

	it('should return nested sections', () => {
		const result = findSection(sections, 'particles');
		expect(result).toEqual(sections[0].sections[0]);
	});

	it('should return undefined when no sections found', () => {
		const result = findSection(sections, 'Pizza');
		expect(result).toBeFalsy();
	});
});
