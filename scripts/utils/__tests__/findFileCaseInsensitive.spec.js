import path from 'path';
import findFileCaseInsensitive from '../findFileCaseInsensitive';

it('should return a file path with the correct case if a file exists', () => {
	const result = findFileCaseInsensitive(path.join(__dirname, 'Findfilecaseinsensitive.Spec.JS'));
	expect(result).toMatch(__filename);
});

it('should return undefined if a file doesn’t exist', () => {
	const result = findFileCaseInsensitive(path.join(__dirname, 'pizza.js'));
	expect(result).toBeFalsy();
});

it('cache clean function shouldn’t throw', () => {
	const fn = () => findFileCaseInsensitive.clearCache();
	expect(fn).not.toThrowError();
});
