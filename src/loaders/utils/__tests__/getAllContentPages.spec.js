import getAllContentPages from '../getAllContentPages';

const sections = [
	{
		name: 'Readme',
		content: 'Readme.md',
		components: [],
		sections: [],
	},
	{
		name: 'Components',
		components: [],
		sections: [],
	},
	{
		name: 'Nesting',
		components: [],
		sections: [
			{
				name: 'Nested',
				components: [],
				sections: [],
			},
			{
				name: 'Nested 2',
				content: 'Nested.md',
				components: [],
				sections: [],
			},
		],
	},
];

it('should return all content pages', () => {
	const result = getAllContentPages(sections);
	expect(result).toEqual(['Readme.md', 'Nested.md']);
});
