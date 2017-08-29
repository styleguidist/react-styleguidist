import devServerUtils from '../devServerUtils';

it('should return a correct address', () => {
	const result = devServerUtils.prepareUrls('http', '0.0.0.0', '6060');
	expect(result.localUrlForTerminal).toBeTruthy();
	expect(result.localUrlForBrowser).toBeTruthy();
	expect(result.lanUrlForConfig).toBeTruthy();
	expect(result.lanUrlForTerminal).toBeTruthy();
});

it('Main method doesn’t throw error', () => {
	const fn = () => devServerUtils.printInstructions();
	expect(fn).not.toThrowError();
});
