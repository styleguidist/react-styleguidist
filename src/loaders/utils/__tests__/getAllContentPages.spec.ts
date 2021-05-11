import getAllContentPages from '../getAllContentPages';
import * as Rsg from '../../../typings';

const readmeContent: Rsg.RequireItResult = {
	require: 'readme.md',
	toAST: () => ({ type: '' }),
};

const nestedContent: Rsg.RequireItResult = {
	require: 'nested.md',
	toAST: () => ({ type: '' }),
};

const sections: Rsg.LoaderSection[] = [
	{
		exampleMode: 'collapse',
		name: 'Readme',
		content: readmeContent,
		components: [],
		sections: [],
	},
	{
		exampleMode: 'collapse',
		name: 'Components',
		components: [],
		sections: [],
	},
	{
		exampleMode: 'collapse',
		name: 'Nesting',
		components: [],
		sections: [
			{
				exampleMode: 'collapse',
				name: 'Nested',
				components: [],
				sections: [],
			},
			{
				exampleMode: 'collapse',
				name: 'Nested 2',
				content: nestedContent,
				components: [],
				sections: [],
			},
		],
	},
];

it('should return all content pages', () => {
	const result = getAllContentPages(sections);
	expect(result).toEqual([readmeContent, nestedContent]);
});
