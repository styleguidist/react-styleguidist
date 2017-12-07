import path from 'path';
import deabsDeep from 'deabsdeep';
import getComponentFiles from '../getComponentFiles';

const configDir = path.resolve(__dirname, '../../../test');
const components = ['one.js', 'two.js'];
const glob = 'components/**/[A-Z]*.js';

const deabs = x => deabsDeep(x, { root: configDir });

it('getComponentFiles() should return an empty array if components is null', () => {
	const result = getComponentFiles();
	expect(result).toEqual([]);
});

it('getComponentFiles() should accept components as a function that returns file names', () => {
	const result = getComponentFiles(() => components, configDir);
	expect(deabs(result)).toEqual(['~/one.js', '~/two.js']);
});

it('getComponentFiles() should accept components as a function that returns absolute paths', () => {
	const absolutize = files => files.map(file => path.join(configDir, file));
	const result = getComponentFiles(() => absolutize(components), configDir);
	expect(deabs(result)).toEqual(['~/one.js', '~/two.js']);
});

it('getComponentFiles() should accept components as a glob', () => {
	const result = getComponentFiles(glob, configDir);
	expect(deabs(result)).toEqual([
		'~/components/Annotation/Annotation.js',
		'~/components/Button/Button.js',
		'~/components/Placeholder/Placeholder.js',
		'~/components/RandomButton/RandomButton.js',
	]);
});

it('getComponentFiles() should ignore specified patterns', () => {
	const result = getComponentFiles(glob, configDir, ['**/*Button*']);
	expect(deabs(result)).toEqual([
		'~/components/Annotation/Annotation.js',
		'~/components/Placeholder/Placeholder.js',
	]);
});

it('getComponentFiles() should throw if components is not a function or a string', () => {
	const fn = () => getComponentFiles(42, configDir);
	expect(fn).toThrowError('should be string or function');
});
