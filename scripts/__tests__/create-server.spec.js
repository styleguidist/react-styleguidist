import createServer from '../create-server';
import getConfig from '../config';

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

test('createServer should return an object containing a server instance', () => {
	process.chdir('test/apps/basic');
	const config = getConfig();
	const result = createServer(config, 'production');
	expect(result).toBeTruthy();
	expect(result.app).toBeTruthy();
});

test('createServer should return an object containing a production Webpack compiler', () => {
	process.chdir('test/apps/basic');
	const config = getConfig();
	const result = createServer(config, 'production');
	expect(result).toBeTruthy();
	expect(result.compiler).toBeTruthy();
	expect(result.compiler.options.output.filename).toBe('build/bundle.js');
	expect(result.compiler.options.cache).toBeFalsy();
});

test('createServer should return an object containing a development Webpack compiler', () => {
	process.chdir('test/apps/basic');
	const config = getConfig();
	const result = createServer(config, 'development');
	expect(result).toBeTruthy();
	expect(result.compiler).toBeTruthy();
	expect(result.compiler.options.output.filename).toBe('build/bundle.js');
	expect(result.compiler.options.cache).toBeTruthy();
});
