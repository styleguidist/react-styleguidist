import path from 'path';
import getComponentFiles from '../getComponentFiles';

const configDir = path.resolve(__dirname, '../../../test');
const components = ['one.js', 'two.js'];
const glob = 'components/**/[A-Z]*.js';

const absolutize = files => files.map(file => path.join(configDir, file));

it('getComponentFiles() should return an empty array if components is null', () => {
	const result = getComponentFiles();
	expect(result).toEqual([]);
});

it('getComponentFiles() should accept components as a function that returns file names', () => {
	const result = getComponentFiles(() => components, configDir);
	expect(result).toEqual(absolutize(components));
});

it('getComponentFiles() should accept components as a function that returns absolute paths', () => {
	const result = getComponentFiles(() => absolutize(components), configDir);
	expect(result).toEqual(absolutize(components));
});

it('getComponentFiles() should accept components as a glob', () => {
	const result = getComponentFiles(glob, configDir);
	expect(result).toEqual(
		absolutize([
			'components/Button/Button.js',
			'components/Placeholder/Placeholder.js',
			'components/RandomButton/RandomButton.js',
		])
	);
});

it('getComponentFiles() should ignore specified patterns', () => {
	const result = getComponentFiles(glob, configDir, ['**/*Button*']);
	expect(result).toEqual(absolutize(['components/Placeholder/Placeholder.js']));
});

it('getComponentFiles() should throw if components is not a function or a string', () => {
	const fn = () => getComponentFiles(42, configDir);
	expect(fn).toThrowError('should be string or function');
});
