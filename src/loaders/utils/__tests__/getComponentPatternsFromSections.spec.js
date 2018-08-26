import getComponentPatternsFromSections from '../getComponentPatternsFromSections';

const sections = [
	{
		name: 'Readme',
		content: 'Readme.md',
	},
	{
		name: 'Components',
		components: 'components/**/B*.js',
	},
	{
		name: 'Nesting',
		sections: [
			{
				name: 'Nested',
				components: 'components/**/P*.js',
			},
		],
	},
];

it('should return a list of patterns', () => {
	const result = getComponentPatternsFromSections(sections);
	expect(result).toEqual(['components/**/B*.js', 'components/**/P*.js']);
});
