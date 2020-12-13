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
		name: 'Readme',
		content: readmeContent,
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
