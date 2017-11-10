import devServerUtils from '../devServerUtils';

it('Main method doesn’t throw error', () => {
	const fn = () => devServerUtils.printInstructions();
	expect(fn).not.toThrowError();
});
