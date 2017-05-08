'use strict';

const fs = require('fs');
const vm = require('vm');
const path = require('path');
const stripShebang = require('strip-shebang');

const BIN_PATH = path.resolve(__dirname, '../styleguidist.js');

// Very simple test to be sure we’re not using any syntax that is not supported in versions of Node we support
it('should not throw when parsing a script', () => {
	const code = stripShebang(fs.readFileSync(BIN_PATH, 'utf8'));

	expect(() => new vm.Script(code)).not.toThrow();
});
