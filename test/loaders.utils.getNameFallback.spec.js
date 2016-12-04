import getNameFallback from '../loaders/utils/getNameFallback';

it('getNameFallback() should return file name without extension', () => {
	const result = getNameFallback('burger/Pizza/Coffee.js');

	expect(result).toEqual('Coffee');
});

it('getNameFallback() should return folder name if file name is index.js', () => {
	const result = getNameFallback('burger/Pizza/index.js');

	expect(result).toEqual('Pizza');
});
