import path from 'path';
import deabsDeep from 'deabsdeep';
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

const deabs = x => deabsDeep(x, { root: configDir });

it('getComponentFilesFromSections() should return a list of files', () => {
	const result = getComponentFilesFromSections(sections, configDir);
	expect(deabs(result)).toEqual([
		'~/components/Button/Button.js',
		'~/components/Placeholder/Placeholder.js',
	]);
});

it('getComponentFilesFromSections() should ignore specified patterns', () => {
	const result = getComponentFilesFromSections(sections, configDir, ['**/*Button*']);
	expect(deabs(result)).toEqual(['~/components/Placeholder/Placeholder.js']);
});
