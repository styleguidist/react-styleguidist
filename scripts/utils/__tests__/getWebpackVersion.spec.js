import getWebpackVersion from '../getWebpackVersion';

it('should return version number', () => {
	const result = getWebpackVersion();
	expect(result).toBeGreaterThanOrEqual(1);
});
