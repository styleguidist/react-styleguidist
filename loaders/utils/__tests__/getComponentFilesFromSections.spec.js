import path from 'path';
import getComponentFilesFromSections from '../getComponentFilesFromSections';

const configDir = path.resolve(__dirname, '../../../test');
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

const absolutize = files => files.map(file => path.join(configDir, file));

it('getComponentFilesFromSections() should return a list of files', () => {
	const result = getComponentFilesFromSections(sections, configDir);
	expect(result).toEqual(
		absolutize(['components/Button/Button.js', 'components/Placeholder/Placeholder.js'])
	);
});

it('getComponentFilesFromSections() should ignore specified patterns', () => {
	const result = getComponentFilesFromSections(sections, configDir, ['**/*Button*']);
	expect(result).toEqual(absolutize(['components/Placeholder/Placeholder.js']));
});
