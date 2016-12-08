import path from 'path';
import getComponents from '../getComponents';

const configDir = path.resolve(__dirname, '../../../test');
const components = ['one.js', 'two.js'];
const glob = 'components/**/[A-Z]*.js';
const config = {
	configDir,
};

const absolutize = files => files.map(file => path.join(configDir, file));

it('getComponents() should return an empty array if components is null', () => {
	const result = getComponents();
	expect(result).toEqual([]);
});

it('getComponents() should accept components as a function that returns file names', () => {
	const result = getComponents(() => components, config);
	expect(result).toEqual(absolutize(components));
});

it('getComponents() should accept components as a function that returns absolute paths', () => {
	const result = getComponents(() => absolutize(components), config);
	expect(result).toEqual(absolutize(components));
});

it('getComponents() should accept components as a glob', () => {
	const result = getComponents(glob, config);
	expect(result).toEqual(absolutize([
		'components/Button/Button.js',
		'components/Placeholder/Placeholder.js',
	]));
});

it('getComponents() should skip components without example file when skipComponentsWithoutExample=true', () => {
	const result = getComponents(glob, {
		...config,
		getExampleFilename: filepath => path.join(path.dirname(filepath), 'examples.md'),
		skipComponentsWithoutExample: true,
	});
	expect(result).toEqual(absolutize([
		'components/Placeholder/Placeholder.js',
	]));
});
