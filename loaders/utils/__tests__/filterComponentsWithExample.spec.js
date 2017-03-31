import filterComponentsWithExample from '../filterComponentsWithExample';

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
				hasExamples: 'require()',
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
						hasExamples: 'require()',
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

it('should skip components without example file', () => {
	const result = filterComponentsWithExample(sections);
	expect(result).toMatchSnapshot();
});
