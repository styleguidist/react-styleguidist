import path from 'path';
import getNameFromFilePath from '../getNameFromFilePath';

it('should return the file name without extension', () => {
	expect(
		getNameFromFilePath(path.join('an', 'absolute', 'path', 'to', 'YourComponent.js'))
	).toEqual('YourComponent');
});

it('should use the directory name if the file name is index.js', () => {
	expect(
		getNameFromFilePath(path.join('an', 'absolute', 'path', 'to', 'YourComponent', 'index.js'))
	).toEqual('YourComponent');
});

it('should capitalize the display name', () => {
	expect(
		getNameFromFilePath(path.join('an', 'absolute', 'path', 'to', 'yourComponent.js'))
	).toEqual('YourComponent');

	expect(
		getNameFromFilePath(path.join('an', 'absolute', 'path', 'to', 'your-component', 'index.js'))
	).toEqual('YourComponent');
});
