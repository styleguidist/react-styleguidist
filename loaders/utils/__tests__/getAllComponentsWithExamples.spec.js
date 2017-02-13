import getAllComponentsWithExamples from '../getAllComponentsWithExamples';

const sections = [
	{
		name: 'Readme',
		content: 'Readme.md',
		components: [],
		sections: [],
	},
	{
		name: 'Components',
		components: [
			{
				filepath: 'components/Button/Button.js',
				examples: 'require()',
			},
			{
				filepath: 'components/Icon/Icon.js',
			},
		],
		sections: [],
	},
	{
		name: 'Nesting',
		components: [],
		sections: [
			{
				name: 'Nested',
				components: [
					{
						filepath: 'components/Image/Image.js',
					},
					{
						filepath: 'components/Modal/Modal.js',
						examples: 'require()',
					},
				],
				sections: [],
			},
			{
				name: 'Nested 2',
				components: [
					{
						filepath: 'components/Avatar/Avatar.js',
					},
				],
				sections: [],
			},
		],
	},
];

it('should return only components with example file', () => {
	const result = getAllComponentsWithExamples(sections);
	expect(result).toMatchSnapshot();
});
