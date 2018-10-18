import path from 'path';
import deabsDeep from 'deabsdeep';
import getComponentFiles from '../getComponentFiles';

const configDir = path.resolve(__dirname, '../../../test');
const components = ['components/Annotation/Annotation.js', 'components/Button/Button.js'];
const processedComponents = components.map(c => `~/${c}`);
const glob = 'components/**/[A-Z]*.js';
const globArray = ['components/Annotation/[A-Z]*.js', 'components/Button/[A-Z]*.js'];

const deabs = x => deabsDeep(x, { root: configDir });

it('getComponentFiles() should return an empty array if components is null', () => {
	const result = getComponentFiles();
	expect(result).toEqual([]);
});

it('getComponentFiles() should accept components as a function that returns file names', () => {
	const result = getComponentFiles(() => components, configDir);
	expect(deabs(result)).toEqual(processedComponents);
});

it('getComponentFiles() should accept components as a function that returns absolute paths', () => {
	const absolutize = files => files.map(file => path.join(configDir, file));
	const result = getComponentFiles(() => absolutize(components), configDir);
	expect(deabs(result)).toEqual(processedComponents);
});

it('getComponentFiles() should accept components as a function that returns globs', () => {
	const result = getComponentFiles(() => globArray, configDir);
	expect(deabs(result)).toEqual([
		'~/components/Annotation/Annotation.js',
		'~/components/Button/Button.js',
	]);
});

it('getComponentFiles() should accept components as an array of file names', () => {
	const result = getComponentFiles(components, configDir);
	expect(deabs(result)).toEqual(processedComponents);
});

it('getComponentFiles() should accept components as an array of absolute paths', () => {
	const absolutize = files => files.map(file => path.join(configDir, file));
	const result = getComponentFiles(absolutize(components), configDir);
	expect(deabs(result)).toEqual(processedComponents);
});

it('getComponentFiles() should accept components as an array of globs', () => {
	const result = getComponentFiles(globArray, configDir);
	expect(deabs(result)).toEqual([
		'~/components/Annotation/Annotation.js',
		'~/components/Button/Button.js',
	]);
});

it('getComponentFiles() should accept components as a glob', () => {
	const result = getComponentFiles(glob, configDir);
	expect(deabs(result)).toEqual([
		'~/components/Annotation/Annotation.js',
		'~/components/Button/Button.js',
		'~/components/Placeholder/Placeholder.js',
		'~/components/Price/Price.js',
		'~/components/RandomButton/RandomButton.js',
	]);
});

it('getComponentFiles() should ignore specified patterns for globs', () => {
	const result = getComponentFiles(glob, configDir, ['**/*Button*']);
	expect(deabs(result)).toEqual([
		'~/components/Annotation/Annotation.js',
		'~/components/Placeholder/Placeholder.js',
		'~/components/Price/Price.js',
	]);
});

it('getComponentFiles() should ignore specified patterns for globs in arrays', () => {
	const result = getComponentFiles(globArray, configDir, ['**/*Button*']);
	expect(deabs(result)).toEqual(['~/components/Annotation/Annotation.js']);
});

it('getComponentFiles() should ignore specified patterns for globs from functions', () => {
	const result = getComponentFiles(() => globArray, configDir, ['**/*Button*']);
	expect(deabs(result)).toEqual(['~/components/Annotation/Annotation.js']);
});

it('getComponentFiles() should throw if components is not a function, array or a string', () => {
	const fn = () => getComponentFiles(42, configDir);
	expect(fn).toThrowError('should be string, function or array');
});
