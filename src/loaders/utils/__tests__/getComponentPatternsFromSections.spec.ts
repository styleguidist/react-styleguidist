import getComponentPatternsFromSections from '../getComponentPatternsFromSections';

const sections = [
	{
		name: 'Readme',
		content: 'Readme.md',
	},
	{
		name: 'Components',
		components: ['components/**/B*.js'],
	},
	{
		name: 'Nesting',
		sections: [
			{
				name: 'Nested',
				components: ['components/**/P*.js'],
			},
		],
	},
	{
		name: 'Nesting With Components',
		components: ['components/**/T*.js'],
		// is this on purpose or a bug ?
		// a section cannot conatin `components` and nested `sections`
		sections: [
			{
				name: 'Ignored Nested',
				components: ['components/**/O*.js'],
			},
		],
	},
];

it('should return a list of patterns', () => {
	const result = getComponentPatternsFromSections(sections);
	expect(result).toEqual(['components/**/B*.js', 'components/**/P*.js', 'components/**/T*.js']);
});
