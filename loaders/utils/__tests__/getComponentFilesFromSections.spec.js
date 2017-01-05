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
const config = {
	configDir,
	getExampleFilename: a => a,
	getComponentPathLine: a => a,
};

const absolutize = files => files.map(file => path.join(configDir, file));

it('getComponentFilesFromSections() should return a list of files', () => {
	const result = getComponentFilesFromSections(sections, config);
	expect(result).toEqual(absolutize([
		'components/Button/Button.js',
		'components/Placeholder/Placeholder.js',
	]));
});
