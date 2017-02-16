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
				hasExamples: true,
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
						hasExamples: true,
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
