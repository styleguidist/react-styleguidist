import fs from 'fs';
import vm from 'vm';
import path from 'path';
import stripShebang from 'strip-shebang';

const BIN_PATH = path.resolve(__dirname, '../styleguidist.js');

// Very simple test to be sure we’re not using any syntax that is not supported in versions of Node we support
it.skip('should not throw when parsing a script', () => {
	const code = stripShebang(fs.readFileSync(BIN_PATH, 'utf8'));

	expect(() => new vm.Script(code)).not.toThrow();
});
