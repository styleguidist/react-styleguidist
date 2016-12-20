'use strict';

/* eslint-disable no-console */

const originalLog = console.log;
afterEach(() => {
	console.log = originalLog;
});

// Very simple test to be sure we’re not using any syntax that is not supported in versions of Node we support
it('should not throw when requiring a file', () => {
	console.log = jest.fn();
	delete require.cache[require.resolve('../styleguidist')];  // Flush require cache
	const fn = () => require('../styleguidist');
	expect(fn).not.toThrow();
});
