import path from 'path';
import getComponentFiles from '../getComponentFiles';

const configDir = path.resolve(__dirname, '../../../test');
const components = ['one.js', 'two.js'];
const glob = 'components/**/[A-Z]*.js';
const config = {
	configDir,
};

const absolutize = files => files.map(file => path.join(configDir, file));

it('getComponentFiles() should return an empty array if components is null', () => {
	const result = getComponentFiles();
	expect(result).toEqual([]);
});

it('getComponentFiles() should accept components as a function that returns file names', () => {
	const result = getComponentFiles(() => components, config);
	expect(result).toEqual(absolutize(components));
});

it('getComponentFiles() should accept components as a function that returns absolute paths', () => {
	const result = getComponentFiles(() => absolutize(components), config);
	expect(result).toEqual(absolutize(components));
});

it('getComponentFiles() should accept components as a glob', () => {
	const result = getComponentFiles(glob, config);
	expect(result).toEqual(absolutize([
		'components/Button/Button.js',
		'components/Placeholder/Placeholder.js',
		'components/RandomButton/RandomButton.js',
	]));
});

it('getComponentFiles() should skip components without example file when skipComponentsWithoutExample=true', () => {
	const result = getComponentFiles(glob, {
		...config,
		getExampleFilename: filepath => path.join(path.dirname(filepath), 'examples.md'),
		skipComponentsWithoutExample: true,
	});
	expect(result).toEqual(absolutize([
		'components/Placeholder/Placeholder.js',
	]));
});
